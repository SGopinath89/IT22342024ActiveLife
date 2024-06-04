import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser'
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import moment from 'moment'
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2'

const MyDiets = () => {
  const {currentUser} = useUser();
  const [loading,setLoading] = useState(true);
  const [userDiets,setUserDiets] = useState([]);
  const [paginatedDta,setPaginatedData] = useState([]);
  const [page,setPage] = useState(1);;
  const itemPerPage = 5;
  const totalPages = Math.ceil(userDiets.length/itemPerPage);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(()=>{
    axiosSecure.get(`/userDiet-Email/${currentUser?.email}`)
    .then((res)=>{
      console.log(res.data)
      setUserDiets(res.data);
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
        axiosSecure.delete(`/delete-userDiet/${id}`)
        .then((res)=>{
            Swal.fire({
              title: "Deleted!",
              text: "Diet has been deleted from your list.",
              icon: "success"
            });
            const newUserDiets = userDiets.filter((item)=>item._id!==id);
            setUserDiets(newUserDiets);
          
          
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
        <h1 className='text-4xl font-bold'>My <span className='text-secondary'>Diets</span></h1>
      </div>
      <div className='h-screen py-8'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='bg-white rounded-lg shadow-md p-6 mb-4 w-full'>
              <table className='w-full'>
                <thead>
                  <tr>
                    <th className='text-left font-semibold'>#</th>
                    <th className='text-left font-semibold'>Diet</th>
                    <th className='text-left font-semibold'>Date</th>
                    <th className='text-left font-semibold'>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    userDiets.length === 0 ? <tr><td colSpan='4' className='text-center text-2xl'>No Diets Found</td></tr>
                    :userDiets.map((item,index)=>{
                      const leftIndex = (page-1)* itemPerPage + index+1;
                      return <tr key={item._id}>
                          <td className='py-4'>{leftIndex}</td>
                          <td className='py-4'>
                            <div className='flex items-center'>
                              <img src={item.dietImg} className='h-16 w-16 mr-4 rounded-lg'/>
                              <span>{item.dietName}</span>
                            </div></td>
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

export default MyDiets