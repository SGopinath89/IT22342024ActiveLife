import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser'
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import moment from 'moment'
import { MdDelete, MdUpdate } from 'react-icons/md';
import Swal from 'sweetalert2'

const MyWorkouts = () => {
  const {currentUser} = useUser();
  const [loading,setLoading] = useState(true);
  const [userWorkouts,setUserWorkouts] = useState([]);
  const [paginatedDta,setPaginatedData] = useState([]);
  const [page,setPage] = useState(1);;
  const itemPerPage = 5;
  const totalPages = Math.ceil(userWorkouts.length/itemPerPage);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(()=>{
    axiosSecure.get(`/userWorkout-Email/${currentUser?.email}`)
    .then((res)=>{
      console.log(res.data)
      setUserWorkouts(res.data);
      setLoading(false)
    })
    .catch((error)=>{
      console.log(error);
      setLoading(false)
    })
  },[])

  const handleDelete=(id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete-userWorkout/${id}`)
        .then((res)=>{
            Swal.fire({
              title: "Deleted!",
              text: "Workout has been deleted from your list.",
              icon: "success"
            });
            const newUserWorkouts = userWorkouts.filter((item)=>item._id!==id);
            setUserWorkouts(newUserWorkouts);
          
          
        })
        .catch((error)=>{
          console.log(error)
        })
      }
    });
  }

  const handleUpdateDays = (id, currentDays) => {
    Swal.fire({
      title: 'Update Number of Days',
      input: 'number',
      inputLabel: 'Enter new number of days',
      inputValue: currentDays,
      showCancelButton: true,
      confirmButtonText: 'Update',
      inputValidator: (value) => {
        if (!value || value <= 0) {
          return 'Please enter a valid number of days';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newDays = parseInt(result.value)
        axiosSecure.patch(`/update-userWorkoutDays/${id}`, { finishedDays: newDays })
          .then((res) => {
            Swal.fire({
              title: 'Updated!',
              text: 'Number of days has been updated.',
              icon: 'success'
            });
            const updatedWorkouts = userWorkouts.map((item) =>
              item._id === id ? { ...item, finishedDays: result.value } : item
            );
            setUserWorkouts(updatedWorkouts);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className='my-6 text-center'>
        <h1 className='text-4xl font-bold'>My <span className='text-secondary'>Workouts</span></h1>
      </div>
      <div className='h-screen py-8'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='bg-white rounded-lg shadow-md p-6 mb-4 w-full'>
              <table className='w-full'>
                <thead>
                  <tr>
                    <th className='text-left font-semibold'>#</th>
                    <th className='text-left font-semibold'>Workouts</th>
                    <th className='text-left font-semibold'>Finished Days</th>
                    <th className='text-left font-semibold'>Total Days</th>
                    <th className='text-left font-semibold'>Date</th>
                    <th className='text-left font-semibold'>Delete</th>
                    <th className='text-center font-semibold'>Update<br/> (Number of Days)</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    userWorkouts.length === 0 ? <tr><td colSpan='7' className='text-center text-2xl'>No Workouts Found</td></tr>
                    :userWorkouts.map((item,index)=>{
                      const leftIndex = (page-1)* itemPerPage + index+1;
                      return <tr key={item._id}>
                          <td className='py-4'>{leftIndex}</td>
                          <td className='py-4'>
                            <div className='flex items-center'>
                              <img src={item.workoutImg} className='h-16 w-16 mr-4 rounded-lg'/>
                              <span>{item.workoutName}</span>
                            </div></td>
                          <td className='py-4'>{item.finishedDays}</td>
                          <td className='py-4'>{item.totaldays}</td>
                          <td className='py-4'>
                            <p className='text-gray-500 text-sm'>
                              {moment(item.data).format("MMMM Do YYYY")}
                            </p>  
                          </td>
                          <td>
                            <button onClick={()=>handleDelete(item._id)} 
                            className='px-3 py-3 cursor-pointer bg-red-500 rounded-3xl text-white font-bold'>
                              <MdDelete/>
                            </button>
                          </td>
                          <td className='text-center'>
                            <button onClick={()=>handleUpdateDays(item._id,item.finishedDays)}
                            className='text-center px-12 py-3 cursor-pointer bg-green-500 rounded-3xl text-white font-bold'>
                              <MdUpdate/>
                            </button>
                          </td>
                      </tr>
                      
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyWorkouts