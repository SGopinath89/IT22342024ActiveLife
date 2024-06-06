import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdDelete ,MdUpdate} from 'react-icons/md';
import Swal from 'sweetalert2'
import { IoMdSearch } from "react-icons/io";

const AllDiets = () => {
    const [loading,setLoading] = useState(true);
    const [diets,setDiets] = useState([]);
    const axiosSecure = useAxiosSecure(); 
    const [searchTerm,setSearchTerm] = useState("")

    useEffect(()=>{
      axiosSecure.get('/diets')
      .then((res)=>{
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
          axiosSecure.delete(`/delete-diet/${id}`)
          .then((res)=>{
              Swal.fire({
                title: "Deleted!",
                text: "Diet has been deleted.",
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
      <div className='h-screen'>
        <div className='my-6 text-center w-[1000px]'>
          <h1 className='text-4xl font-bold text-secondary'>All Diets</h1>
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
          <div className='text-right'>
            <Link to="/dashboard/addDiet">
              <button 
              className='px-12 py-3 cursor-pointer bg-red-500 rounded-3xl text-white font-bold text-center'>
              Add Diet
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
                      <th className='text-left font-semibold'>How It Works</th>
                      <th className='text-left font-semibold'>Benefitd</th>
                      <th className='text-left font-semibold'>Downsides</th>
                      <th className='text-left font-semibold'>Edit</th>
                      <th className='text-left font-semibold'>Delete</th>
                    </tr>
                  </thead>
  
                  <tbody>
                    { diets.length === 0 ? <tr><td colSpan='4' className='text-center text-2xl'>No Diets Found</td></tr>
                      :diets
                      .filter((item)=>{
                        if(searchTerm ==""){
                          return item;
                        }else if(item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
                        || item.howItWorks.toLowerCase().includes(searchTerm.toLowerCase())
                        || item.benefits.toLowerCase().includes(searchTerm.toLowerCase())
                        || item.downsides.toLowerCase().includes(searchTerm.toLowerCase())){
                          return item;
                        }
                      })
                      .map((item,index)=>{
                            return <tr key={item._id}>
                            <td className='py-4 text-center'>
                              {highlightText(item.name, searchTerm)}
                            </td>
                            <td className='py-4 text-center'>
                              {highlightText(item.howItWorks, searchTerm)} 
                            </td>
                            <td className='py-4 text-center'>
                              {highlightText(item.benefits, searchTerm)} 
                            </td>
                            <td className='py-4 text-center'>
                              {highlightText(item.downsides, searchTerm)} 
                            </td>
                            <td className='text-center'>
                                <Link to={`/dashboard/updateD/${item._id}`}>
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