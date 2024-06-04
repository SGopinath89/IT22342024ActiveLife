import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser'
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import moment from 'moment'
import { MdDelete, MdUpdate } from 'react-icons/md';
import Swal from 'sweetalert2'

const MyInstructors = () => {
  const {currentUser} = useUser();
  const [loading,setLoading] = useState(true);
  const [userInstructors,setUserInstructor] = useState([]);
  const [paginatedDta,setPaginatedData] = useState([]);
  const [page,setPage] = useState(1);;
  const itemPerPage = 5;
  const totalPages = Math.ceil(userInstructors.length/itemPerPage);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(()=>{
    axiosSecure.get(`/userInstructor-Email/${currentUser?.email}`)
    .then((res)=>{
      console.log(res.data)
      setUserInstructor(res.data);
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
        axiosSecure.delete(`/delete-userInstructor/${id}`)
        .then((res)=>{
            Swal.fire({
              title: "Deleted!",
              text: "Instructor request has been deleted.",
              icon: "success"
            });
            const newUserInstructors = userInstructors.filter((item)=>item._id!==id);
            setUserInstructor(newUserInstructors);
          
          
        })
        .catch((error)=>{
          console.log(error)
        })
      }
    });
  }

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div className='w-[1100px]'>
      <div className='my-6 text-center'>
        <h1 className='text-4xl font-bold'>My <span className='text-secondary'>Instructors</span></h1>
      </div>
      <div className='h-screen py-8'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='bg-white rounded-lg shadow-md p-6 mb-4 w-full'>
              <table className='w-full'>
                <thead>
                  <tr>
                    <th className='text-left font-semibold'>#</th>
                    <th className='text-left font-semibold'>Name</th>
                    <th className='text-left font-semibold'>Specialities</th>
                    <th className='text-left font-semibold'>Date</th>
                    <th className='text-left font-semibold'>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    userInstructors.length === 0 ? <tr><td colSpan='7' className='text-center text-2xl'>No Instructors Found</td></tr>
                    :userInstructors.map((item,index)=>{
                      const leftIndex = (page-1)* itemPerPage + index+1;
                      return <tr key={item._id}>
                          <td className='py-4'>{leftIndex}</td>
                          <td className='py-4'>{item.instructorName}</td>
                          <td className='py-4'>{item.speciality}</td>
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

export default MyInstructors