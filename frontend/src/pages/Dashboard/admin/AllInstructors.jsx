import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdDelete ,MdEmail,MdUpdate} from 'react-icons/md';
import moment from 'moment'
import Swal from 'sweetalert2'

const AllInstructors = () => {
    const [loading,setLoading] = useState(true);
    const [instructors,setInstructors] = useState([]);
    const [userinstructors,setuserInstructors] = useState([]);
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

    useEffect(()=>{
      axiosSecure.get('/userInstructors')
      .then((res)=>{
        setuserInstructors(res.data);
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

    const handleSendEmail = (item) => {
      axiosSecure.post('/send-email', {
          userEmail: item.userEmail,
          instructorName: item.instructorName,
          instructorEmail: item.instructorEmail,
          speciality: item.speciality,
          date: moment(item.data).format("MMMM Do YYYY")
      }).then((res) => {
          Swal.fire({
              title: "Email Sent!",
              text: "The email has been sent successfully.",
              icon: "success"
          });
      }).catch((error) => {
          console.log(error);
          Swal.fire({
              title: "Error!",
              text: "There was an error sending the email.",
              icon: "error"
          });
      });
  };
    
    return (
      <div className='h-screen'>
        <div className='my-6 text-center w-[1000px]'>
          <h1 className='text-4xl font-bold text-secondary'>All Instructor & Doctor</h1>
        </div>
        <div >
          <div className='container mx-auto px-4'>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='bg-white rounded-lg shadow-md p-6 mb-4 w-full'>
                <table className='w-full '>
                  <thead>
                    <tr >
                      <th className='text-left font-semibold'>Name</th>
                      <th className='text-left font-semibold'>Email</th>
                      <th className='text-center font-semibold'>Phone</th>
                      <th className='text-center font-semibold'>Qualification</th>
                      <th className='text-center font-semibold'>Experience</th>
                      <th className='text-center font-semibold'>Specialities</th>
                      <th className='text-center font-semibold'>Edit</th>
                      <th className='text-left font-semibold'>Delete</th>
                    </tr>
                  </thead>
  
                  <tbody>
                    { 

                    instructors.length === 0 ? <tr><td colSpan='4' className='text-center text-2xl'>No Instructor/Doctor Found</td></tr>
                      :instructors.map((item)=>{
                            return <tr key={item._id}>
                            <td className='py-4 text-center'>
                              {item.name}
                            </td>
                            <td className='py-4 text-center'>
                              {item.email} 
                            </td>
                            <td className='py-4 text-center'>
                                {item.phoneNo}
                            </td>
                            <td className='py-4 text-center'>
                              {item.qualification} 
                            </td>
                            <td className='py-4 text-center'>
                              {item.experience} 
                            </td>
                            <td className='py-4 text-center'>
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
          <div className='text-right'>
            <Link to="/dashboard/addInstructor">
              <button 
              className='px-12 py-3 cursor-pointer bg-red-500 rounded-3xl text-white font-bold text-center'>
              Add New Instructor/Doctor
              </button>
            </Link>
          </div>
        </div>
        <div>
        <div className='my-6 text-center w-[1000px]'>
            <h1 className='text-3xl font-bold text-secondary'>Customer's Requests for Instructors & Doctors </h1>
        </div>
        <div >
            <div className='container mx-auto px-4'>
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='bg-white rounded-lg shadow-md p-6 mb-4 w-full'>
                  <table className='w-full '>
                    <thead>
                      <tr >
                        <th className='text-left font-semibold'>Instructor Name</th>
                        <th className='text-left font-semibold'>Instructor Email</th>
                        <th className='text-left font-semibold'>Customer Email</th>
                        <th className='text-left font-semibold'>Specialities</th>
                        <th className='text-left font-semibold'>Date</th>
                        <th className='text-center font-semibold'>Send Email</th>
                      </tr>
                    </thead>
    
                    <tbody>
                      { 

                      userinstructors.length === 0 ? <tr><td colSpan='4' className='text-center text-2xl'>No Instructor/Doctor Found</td></tr>
                        :userinstructors.map((item)=>{
                              return <tr key={item._id}>
                              <td className='py-4 text-center'>
                                {item.instructorName}
                              </td>
                              <td className='py-4 text-center'>
                                {item.instructorEmail} 
                              </td>
                              <td className='py-4 text-center'>
                                  {item.userEmail}
                              </td>
                              <td className='py-4 text-center'>
                                {item.speciality} 
                              </td>
                              <td className='py-4 text-center'>
                              <p className='text-gray-500 text-sm'>
                                {moment(item.data).format("MMMM Do YYYY")}
                              </p>
                              </td>
                              <td className='text-center'>
                                      <button 
                                      onClick={() => handleSendEmail(item)}
                                      className='text-center px-12 py-3 cursor-pointer bg-green-500 rounded-3xl text-white font-bold'>
                                      <MdEmail/>
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
      </div>
    )
}

export default AllInstructors