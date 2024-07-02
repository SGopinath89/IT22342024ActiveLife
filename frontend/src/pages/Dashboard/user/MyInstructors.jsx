import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import moment from 'moment'
import { MdDelete} from 'react-icons/md';
import Swal from 'sweetalert2'
import { IoMdSearch } from "react-icons/io";

const MyInstructors = () => {
  const {currentUser} = useUser();
  const [loading,setLoading] = useState(true);
  const [userInstructors,setUserInstructor] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [searchTerm,setSearchTerm] = useState("")

  useEffect(()=>{
    axiosSecure.get(`http://localhost:5000/userInstructor/${currentUser?.email}`)
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
        axiosSecure.delete(`http://localhost:5000/userInstructor/${id}`)
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
    <div className='w-full h-screen px-10'>
      <div className='my-6 text-center'>
        <h1 className='text-4xl font-bold'>My <span className='text-secondary'>Instructors</span></h1>
      </div>
      <div className='flex'  style={{ display: 'flex', justifyContent: 'right', alignItems: 'right'}}>
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
              <table className='w-full'>
                <thead>
                  <tr>
                    <th className='text-left font-semibold'>#</th>
                    <th className='text-left font-semibold'>Instructor/Doctor Name</th>
                    <th className='text-left font-semibold'>Specialities</th>
                    <th className='text-left font-semibold'>Date</th>
                    <th className='text-left font-semibold'>Status</th>
                    <th className='text-left font-semibold'>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userInstructors.length === 0 ? <tr><td colSpan='7' className='text-center text-2xl'>No Instructors Found</td></tr>
                    :userInstructors
                    .filter((item)=>{
                      const formattedDate = moment(item.data).format("MMMM Do YYYY").toLowerCase();
                      if(searchTerm ==""){
                        return item;
                      }else if(item.instructorName?.toLowerCase().includes(searchTerm.toLowerCase()) 
                      || formattedDate.includes(searchTerm.toLowerCase())
                      || item.speciality.toLowerCase().includes(searchTerm.toLowerCase())
                      || item.status.toLowerCase().includes(searchTerm.toLowerCase())
                    ){
                        return item;
                      }
                    })
                    .map((item,index)=>{
                      return <tr key={item._id}>
                          <td className='py-4'>{index+1}</td>
                          <td className='py-4'>{highlightText(item.instructorName, searchTerm)}</td>
                          <td className='py-4'>{highlightText(item.speciality, searchTerm)}</td>
                          <td className='py-4'>
                            <p className='text-gray-500 text-sm'>
                              {highlightText(moment(item.data).format("MMMM Do YYYY"), searchTerm)}
                            </p>  
                          </td>
                          <td className='py-4'>{highlightText(item.status, searchTerm)}</td>
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