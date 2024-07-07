import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import {MdEmail,MdUpdate} from 'react-icons/md'
import moment from 'moment'
import Swal from 'sweetalert2'
import emailjs from 'emailjs-com'
import { IoMdSearch } from "react-icons/io"
import { IoMdDoneAll } from "react-icons/io"
import { RxCross2 } from "react-icons/rx"
import { RiMailCheckFill } from "react-icons/ri"

const UserRequest = () => {
    const [loading,setLoading] = useState(true);
    const [userinstructors,setuserInstructors] = useState([]);
    const axiosSecure = useAxiosSecure(); 
    const [searchTerm,setSearchTerm] = useState("")
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
                  icon: 'success',
                  timer: 1500
                });
                const updatedUserInstructors = userinstructors.map((item) =>
                  item._id === id ? { ...item, status: result.value } : item
                );
                setuserInstructors(updatedUserInstructors);
              })
              .catch((error) => {
                console.log(error);
                Swal.fire({
                  text: 'Error!!!',
                  icon: 'warning',
                  timer: 1500
                });
              });
          }
        });
    };

    if(loading){
        return <div>Loading...</div>
    }

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
            date: moment(item.data).format("MMMM Do YYYY")
        }, userID)
            .then((response) => {
                Swal.fire({
                    title: "Email Sent!",
                    text: "The email has been sent successfully.",
                    icon: "success",
                    timer: 1500
                });
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    title: "Error!",
                    text: "There was an error sending the email.",
                    icon: "error",
                    timer: 1500
                });
            });
    };

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
    <div className='w-screen h-screen justify-top items-center'>
      <div className="bg-white p-8 w-[1000px] rounded-lg ">
        <div className='my-6 text-center w-[1000px]'>
            <h1 className='text-3xl font-bold text-secondary'>Customer's Requests for Instructors & Doctors </h1>
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
                        <th className='text-left font-semibold'>Instructor Name</th>
                        <th className='text-left font-semibold'>Instructor Email</th>
                        <th className='text-left font-semibold'>Customer Name</th>
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
                                {
                                  item.status == "Accepted" && <div><br/>
                                    <button
                                      className='text-center px-8 py-3 cursor-pointer bg-green-500 rounded-3xl text-white font-bold'>
                                      <IoMdDoneAll className='w-[25px] h-[25px]'/>
                                    </button>
                                  </div>
                                }
                                {
                                  item.status == "Pending" && <div><br/>
                                    <button 
                                      onClick={() => handleSendEmail(item)}
                                      className='text-center px-8 py-3 cursor-pointe bg-yellow-500 rounded-3xl text-white font-bold'>
                                      <MdEmail className='w-[25px] h-[25px]'/>
                                    </button>
                                  </div>
                                }
                                {
                                  item.status == "Rejected" && <div><br/>
                                    <button
                                      className='text-center px-8 py-3 cursor-pointer bg-red-500 rounded-3xl text-white font-bold'>
                                      <RxCross2 className='w-[25px] h-[25px]'/>
                                    </button>
                                  </div>
                                }
                                {
                                  item.status == "Email Sent" && <div> <br/>
                                    <button
                                      className='text-center px-8 py-3 cursor-pointer bg-green-500 rounded-3xl text-white font-bold'>
                                      <RiMailCheckFill className='w-[25px] h-[25px]'/>
                                    </button>
                                  </div>
                                }
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

export default UserRequest