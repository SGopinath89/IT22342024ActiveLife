import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser'
import { Link, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdDelete ,MdUpdate} from 'react-icons/md';
import Swal from 'sweetalert2'

const AllDiets = () => {
    const {currentUser} = useUser();
    const [loading,setLoading] = useState(true);
    const [diets,setDiets] = useState([]);
    const [paginatedDta,setPaginatedData] = useState([]);
    const [page,setPage] = useState(1);;
    const itemPerPage = 5;
    const totalPages = Math.ceil(diets.length/itemPerPage);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure(); 
    useEffect(()=>{
      axiosSecure.get('/diets')
      .then((res)=>{
        console.log(res.data)
        setDiets(res.data);
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
              const newDiets = diets.filter((item)=>item._id!==id);
              setDiets(newDiets);
            
            
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
          <h1 className='text-4xl font-bold text-secondary'>Diets</h1>
        </div>
        <div className='h-screen py-8'>
          <div className='container mx-auto px-4'>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='bg-white rounded-lg shadow-md p-6 mb-4 w-full'>
                <table className='w-full '>
                  <thead>
                    <tr >
                      <th className='text-left font-semibold'>Name</th>
                      <th className='text-left font-semibold'>How It Works</th>
                      <th className='text-left font-semibold'>Benefitd</th>
                      <th className='text-left font-semibold'>Downsides</th>
                      <th className='text-left font-semibold'>Edit</th>
                      <th className='text-left font-semibold'>Delete</th>
                    </tr>
                  </thead>
  
                  <tbody>
                    { 

                        diets.length === 0 ? <tr><td colSpan='4' className='text-center text-2xl'>No Diets Found</td></tr>
                      :diets.map((item,index)=>{
                            return <tr key={item._id}>
                            <td className='py-4'>
                              <div className='flex items-center'>
                                <span>{item.name}</span>
                              </div></td>
                            <td className='py-4'>
                              {item.howItWorks} 
                            </td>
                            <td className='py-4'>
                              {item.benefits} 
                            </td>
                            <td className='py-4'>
                              {item.downsides} 
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

export default AllDiets