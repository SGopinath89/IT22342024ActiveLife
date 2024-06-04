import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdDelete ,MdUpdate} from 'react-icons/md';
import Swal from 'sweetalert2'

const AllInstructors = () => {
    const [loading,setLoading] = useState(true);
    const [instructors,setInstructors] = useState([]);
    const axiosSecure = useAxiosSecure(); 
    
    useEffect(()=>{
      axiosSecure.get('/instructors')
      .then((res)=>{
        setInstructors(res.data);
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
          axiosSecure.delete(`/delete-instructor/${id}`)
          .then((res)=>{
              Swal.fire({
                title: "Deleted!",
                text: "Doctor/Instructor has been deleted.",
                icon: "success"
              });
              const newInstructors = instructors.filter((item)=>item._id!==id);
              setInstructors(newInstructors);
            
            
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
      <div className='h-screen'>
        <div className='my-6 text-center w-[1000px]'>
          <h1 className='text-4xl font-bold text-secondary'>All Instructor & Doctor</h1>
        </div>
        <div className='h-screen py-8'>
          <div className='text-right'>
            <Link to="/dashboard/addInstructor">
              <button 
              className='px-12 py-3 cursor-pointer bg-red-500 rounded-3xl text-white font-bold text-center'>
              Add Instructor/Doctor
              </button>
            </Link>
          </div>
          <div className='container mx-auto px-4'>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='bg-white rounded-lg shadow-md p-6 mb-4 w-full'>
                <table className='w-full '>
                  <thead>
                    <tr >
                      <th className='text-left font-semibold'>Name</th>
                      <th className='text-left font-semibold'>Email</th>
                      <th className='text-left font-semibold'>Phone</th>
                      <th className='text-left font-semibold'>Qualification</th>
                      <th className='text-left font-semibold'>Experience</th>
                      <th className='text-left font-semibold'>Specialities</th>
                      <th className='text-left font-semibold'>Edit</th>
                      <th className='text-left font-semibold'>Delete</th>
                    </tr>
                  </thead>
  
                  <tbody>
                    { 

                    instructors.length === 0 ? <tr><td colSpan='4' className='text-center text-2xl'>No Instructor/Doctor Found</td></tr>
                      :instructors.map((item)=>{
                            return <tr key={item._id}>
                            <td className='py-4'>
                              <div className='flex items-center'>
                                <span>{item.name}</span>
                              </div></td>
                            <td className='py-4'>
                              {item.email} 
                            </td>
                            <td className='py-4'>
                                {item.phoneNo}
                            </td>
                            <td className='py-4'>
                              {item.qualification} 
                            </td>
                            <td className='py-4'>
                              {item.experience} 
                            </td>
                            <td className='py-4'>
                              {item.specialities} 
                            </td>
                            <td className='text-center'>
                                <Link to="/dashboard">
                                    <button 
                                    className='text-center px-12 py-3 cursor-pointer bg-green-500 rounded-3xl text-white font-bold'>
                                    <MdUpdate/>
                                    </button>
                                </Link>
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

export default AllInstructors