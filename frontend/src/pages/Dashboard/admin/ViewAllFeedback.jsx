import React, { useContext, useEffect,useState } from 'react'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import { useNavigate } from 'react-router-dom';
import { IoMdSearch } from "react-icons/io";
import Swal from 'sweetalert2';
import {MdEmail } from 'react-icons/md';
import emailjs from 'emailjs-com';

const ViewAllFeedback = () => {
    const navigate = useNavigate();
    const axiosFetch = useAxiosFetch();
    const [feedbacks,setFeedbacks] = useState([]);
    const [searchTerm,setSearchTerm] = useState("");

    useEffect(()=>{
        axiosFetch
          .get("http://localhost:5000/feedback")
          .then((res)=>{setFeedbacks(res.data)})
          .catch((err)=>console.log(err))
      },[axiosFetch]);

    const highlightText = (text, highlight) => {
        if (!text) {
            return '';
        }
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
    

    const handleSendEmail = (feedback) => {
        const serviceID = 'service_0wouvog';
        const templateID = 'template_0ouuk8r';
        const userID = 'qTuGMKdPYTd8rcL_U';
    
        emailjs.send(serviceID, templateID, {
            to_email: feedback.userEmail,
            to_name:feedback.userName
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

  return (
    <div className='w-[1000px] m-6 h-screen'><br/>
        <div>
            <h1 className='text-5xl font-bold text-center text-secondary dark:text-white'>Customer Feedbacks</h1>
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
        <div className='m-6'>
        {
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 '>
                {
                      feedbacks
                      .filter((feedback)=>{
                        const userName = feedback.userName || '';
                        const rating = feedback.rating || '';
                        const service = feedback.service || '';
                        const suggestions = feedback.suggestions || '';
                        if(searchTerm ==""){
                          return feedback;
                        }else if(userName.toLowerCase().includes(searchTerm.toLowerCase()) 
                        || rating.toLowerCase().includes(searchTerm.toLowerCase())
                        || service.toLowerCase().includes(searchTerm.toLowerCase())
                        || suggestions.toLowerCase().includes(searchTerm.toLowerCase())){
                          return feedback;
                        }
                      })
                      .map((feedback)=>(
                        <div key={feedback._id} className='shadow-lg rounded-lg p-3 flex flex-col justify-between border border-secondary overflow-hidden m-4'>
                        <div className='p-4'>
                            <h2 className='text-xl font-semibold mb-10 dark:text-white text-center'>{highlightText(feedback.userName, searchTerm)}</h2>
                            
                            <br/>
                            <p className='text-black mb-2 text-center dark:text-white'><span className='font-bold'>
                                Rating : </span>{highlightText(feedback.rating, searchTerm)}</p>
                            <p className='text-black mb-2 text-center dark:text-white'><span className='font-bold'>
                                Usage : </span>{highlightText(feedback.service, searchTerm)}  </p>
                            <p className='text-black mb-2 text-center dark:text-white'><span className='font-bold'>
                                Suggestions : </span>{highlightText(feedback.suggesions, searchTerm)}  </p>
                            <br/>
                            <div className='text-center'>
                                <button 
                                    onClick={() => handleSendEmail(feedback)}
                                    className='text-center px-12 py-3 cursor-pointer bg-green-500 rounded-3xl text-white font-bold'>
                                    <MdEmail/>
                                </button>
                            </div><br/>
                        </div>
                      </div>
                      ))
                }
              </div>
            }
            </div>
    </div>
  )
}

export default ViewAllFeedback