import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser'
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2'
import { IoMdSearch } from "react-icons/io";

const Users = () => {
    const {currentUser} = useUser();
    const [loading,setLoading] = useState(true);
    const [users,setUsers] = useState([]);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const role = currentUser.role
    const [searchTerm,setSearchTerm] = useState("")

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

    const highlightText = (text, highlight) => {
      if (!highlight.trim()) {
        return text;
      }
      const regex = new RegExp(`(${highlight})`, 'gi');
      return text.split(regex).map((part, index) =>
        regex.test(part) ? (
          <span key={index} className="bg-yellow-200">{part}</span>
        ) : (
          part
        )
      );
    };
    
    return (
      <div className='w-[1050px]'>
        <div className='my-6 text-center'>
          <h1 className='text-4xl font-bold text-secondary'>Users</h1>
        </div>
        <div className='flex text-right' style={{ display: 'flex', justifyContent: 'right', alignItems: 'right'}}>
          <input id='searchInput' type='text' placeholder='Search' 
            className='border-gray-300 border rounded-md py-2 px-4'
            onChange={(event)=>{
            setSearchTerm(event.target.value)
            }}
          />
          <IoMdSearch className='w-[40px] h-[40px]'/>
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
                      :users
                      .filter((item)=>{
                        if(searchTerm ==""){
                          return item;
                        }else if(item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) 
                        || item.email.toLowerCase().includes(searchTerm.toLowerCase())
                        || item.phoneNo.toLowerCase().includes(searchTerm.toLowerCase())
                        || item.address.toLowerCase().includes(searchTerm.toLowerCase())
                        || item.age.toString().toLowerCase().includes(searchTerm.toLowerCase())
                        || item.employmentStatus.toLowerCase().includes(searchTerm.toLowerCase())){
                          return item;
                        }
                      })
                      .map((item,index)=>{
                        if(item.role=='user'){
                            return <tr key={item._id}>
                            <td className='py-4'>
                              <div className='flex items-center'>
                                <img src={item.photoUrl} className='h-16 w-16 mr-4 rounded-lg'/>
                                <span>{highlightText(item.fullName, searchTerm)}</span>
                              </div></td>
                            <td className='py-4'>
                              {highlightText(item.email, searchTerm)} 
                            </td>
                            <td className='py-4'>
                              {highlightText(item.phoneNo, searchTerm)} 
                            </td>
                            <td className='py-4'>
                              {highlightText(item.address, searchTerm)} 
                            </td>
                            <td className='py-4'>
                              {highlightText(item.age.toString(), searchTerm)} 
                            </td>
                            <td className='py-4'>
                              {highlightText(item.employmentStatus, searchTerm)} 
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