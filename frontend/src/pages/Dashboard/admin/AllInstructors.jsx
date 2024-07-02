import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdDelete ,MdEmail,MdUpdate} from 'react-icons/md';
import moment from 'moment'
import Swal from 'sweetalert2'
import { IoMdSearch } from "react-icons/io";
import emailjs from 'emailjs-com';

const AllInstructors = () => {
    const [loading,setLoading] = useState(true);
    const [instructors,setInstructors] = useState([]);
    const [userinstructors,setuserInstructors] = useState([]);
    const axiosSecure = useAxiosSecure(); 
    const [searchTerm,setSearchTerm] = useState("")
    
    useEffect(()=>{
      axiosSecure.get('http://localhost:5000/instructor')
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
      axiosSecure.get('http://localhost:5000/userInstructor')
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
          axiosSecure.delete(`http://localhost:5000/instructor/${id}`)
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

    const handleStatus = (id, status) => {
      Swal.fire({
        title: 'Update Request Status',
        input: 'text',
        inputPlaceholder:'Pending / Email Sent / Rejected / Accepted',
        inputValue: status,
        showCancelButton: true,
        confirmButtonText: 'Update',
      }).then((result) => {
        if (result.isConfirmed) {
          const newStatus = result.value
          axiosSecure.patch(`http://localhost:5000/userInstructor/${id}`, { status: newStatus })
            .then((res) => {
              Swal.fire({
                title: 'Updated!',
                text: 'Request Status has been updated.',
                icon: 'success'
              });
              const updatedUserInstructors = userinstructors.map((item) =>
                item._id === id ? { ...item, status: result.value } : item
              );
              setuserInstructors(updatedUserInstructors);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    };
  
    //pw = Active1234
    //email = activelifeadm1@gmail.com
    const handleSendEmail = (item) => {
      const serviceID = 'service_0wouvog';
      const templateID = 'template_t9faz3s';
      const userID = 'qTuGMKdPYTd8rcL_U';
  
      emailjs.send(serviceID, templateID, {
          to_email: item.instructorEmail,
          to_name:item.instructorName,
          user_name:item.userName,
          user_email: item.userEmail,
          instructor_name: item.instructorName,
          speciality: item.speciality,
          date: moment(item.data).format("MMMM Do YYYY")
      }, userID)
          .then((response) => {
              Swal.fire({
                  title: "Email Sent!",
                  text: "The email has been sent successfully.",
                  icon: "success"
              });
          })
          .catch((error) => {
              console.log(error);
              Swal.fire({
                  title: "Error!",
                  text: "There was an error sending the email.",
                  icon: "error"
              });
          });
    };

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
      <div className='w-full h-screen'>
        <div className='my-6 text-center w-[1000px]'>
          <h1 className='text-4xl font-bold text-secondary'>All Instructor & Doctor</h1>
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
                      :instructors
                      .filter((item)=>{
                        if(searchTerm ==""){
                          return item;
                        }else if(item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
                        || item.email.toLowerCase().includes(searchTerm.toLowerCase())
                        || item.phoneNo.toLowerCase().includes(searchTerm.toLowerCase())
                        || item.qualification.toLowerCase().includes(searchTerm.toLowerCase())
                        || item.experience.toLowerCase().includes(searchTerm.toLowerCase())
                        || item.specialities.toLowerCase().includes(searchTerm.toLowerCase())){
                          return item;
                        }
                      })
                      .map((item,index)=>{
                            return <tr key={item._id}>
                            <td className='py-4 text-center'>
                              {highlightText(item.name, searchTerm)}
                            </td>
                            <td className='py-4 text-center'>
                              {highlightText(item.email, searchTerm)} 
                            </td>
                            <td className='py-4 text-center'>
                                {highlightText(item.phoneNo, searchTerm)}
                            </td>
                            <td className='py-4 text-center'>
                              {highlightText(item.qualification, searchTerm)} 
                            </td>
                            <td className='py-4 text-center'>
                              {highlightText(item.experience, searchTerm)} 
                            </td>
                            <td className='py-4 text-center'>
                              {highlightText(item.specialities, searchTerm)} 
                            </td>
                            <td className='text-center'>
                                <Link to={`/dashboard/updateI/${item._id}`}>
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
                        <th className='text-left font-semibold'>Customer Name</th>
                        <th className='text-center font-semibold'>Specialities</th>
                        <th className='text-center font-semibold'>Date</th>
                        <th className='text-center font-semibold'>Status</th>
                        <th className='text-center font-semibold'>Send Email</th>
                      </tr>
                    </thead>
    
                    <tbody>
                      { 

                      userinstructors.length === 0 ? <tr><td colSpan='4' className='text-center text-2xl'>No Instructor/Doctor Found</td></tr>
                        :userinstructors
                        .filter((item)=>{
                          const formattedDate = moment(item.data).format("MMMM Do YYYY").toLowerCase();
                          if(searchTerm ==""){
                            return item;
                          }else if(item.instructorName.toLowerCase().includes(searchTerm.toLowerCase()) 
                          || item.instructorEmail.toLowerCase().includes(searchTerm.toLowerCase())
                          || item.userName.toLowerCase().includes(searchTerm.toLowerCase())
                          || item.speciality.toLowerCase().includes(searchTerm.toLowerCase())
                          || formattedDate.toLowerCase().includes(searchTerm.toLowerCase())){
                            return item;
                          }
                        })
                        .map((item)=>{
                              return <tr key={item._id}>
                              <td className='py-4 text-center'>
                                {highlightText(item.instructorName, searchTerm)}
                              </td>
                              <td className='py-4 text-center'>
                                {highlightText(item.instructorEmail, searchTerm)} 
                              </td>
                              <td className='py-4 text-center'>
                                  {highlightText(item.userName, searchTerm)}
                              </td>
                              <td className='py-4 text-center'>
                                {highlightText(item.speciality, searchTerm)} 
                              </td>
                              <td className='py-4 text-center'>
                              <p className='text-gray-500 text-sm'>
                                {highlightText(moment(item.data).format("MMMM Do YYYY"), searchTerm)}
                              </p>
                              </td>
                              <td className='py-4 text-center'>
                              {highlightText(item.status, searchTerm)}<br/>
                              <button onClick={()=>handleStatus(item._id,item.status)}
                                className='text-center px-5 py-3 cursor-pointer bg-green-500 rounded-3xl text-white font-bold'>
                                  <MdUpdate/>
                              </button>
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