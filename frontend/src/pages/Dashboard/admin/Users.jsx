import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser'
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2'

const Users = () => {
    const {currentUser} = useUser();
    const [loading,setLoading] = useState(true);
    const [users,setUsers] = useState([]);
    const [paginatedDta,setPaginatedData] = useState([]);
    const [page,setPage] = useState(1);;
    const itemPerPage = 5;
    const totalPages = Math.ceil(users.length/itemPerPage);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const role = currentUser.role  
    useEffect(()=>{
      axiosSecure.get('/users')
      .then((res)=>{
        console.log(res.data)
        setUsers(res.data);
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
          axiosSecure.delete(`/delete-user/${id}`)
          .then((res)=>{
              Swal.fire({
                title: "Deleted!",
                text: "Diet has been deleted from your list.",
                icon: "success"
              });
              const newUsers = users.filter((item)=>item._id!==id);
              setUsers(newUsers);
            
            
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
      <div>
        <div className='my-6 text-center'>
          <h1 className='text-4xl font-bold text-secondary'>Users</h1>
        </div>
        <div className='h-screen py-8'>
          <div className='container mx-auto px-4'>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='bg-white rounded-lg shadow-md p-6 mb-4 w-full'>
                <table className='w-full '>
                  <thead>
                    <tr>
                      <th className='text-left font-semibold'>Full Name</th>
                      <th className='text-left font-semibold'>Email</th>
                      <th className='text-left font-semibold'>Phone no</th>
                      <th className='text-left font-semibold'>Address</th>
                      <th className='text-left font-semibold'>Age</th>
                      <th className='text-left font-semibold'>Employment Status</th>
                      <th className='text-left font-semibold'>Delete</th>
                    </tr>
                  </thead>
  
                  <tbody>
                    { 

                      users.length === 0 ? <tr><td colSpan='4' className='text-center text-2xl'>No Diets Found</td></tr>
                      :users.map((item,index)=>{
                        if(item.role=='user'){
                            return <tr key={item._id}>
                            <td className='py-4'>
                              <div className='flex items-center'>
                                <img src={item.photoUrl} className='h-16 w-16 mr-4 rounded-lg'/>
                                <span>{item.fullName}</span>
                              </div></td>
                            <td className='py-4'>
                              {item.email} 
                            </td>
                            <td className='py-4'>
                              {item.phoneNo} 
                            </td>
                            <td className='py-4'>
                              {item.address} 
                            </td>
                            <td className='py-4'>
                              {item.age} 
                            </td>
                            <td className='py-4'>
                              {item.employmentStatus} 
                            </td>
                            <td>
                              <button onClick={()=>handleDelete(item._id)} 
                              className='px-3 py-3 cursor-pointer bg-red-500 rounded-3xl text-white font-bold'>
                                <MdDelete/>
                              </button>
                              
                            </td>
                        </tr>
                        }
                        
                        
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

export default Users