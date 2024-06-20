import React, { useState } from 'react'
import logo from '/logo-black.png?url'
import line from '../assets/line.png'
import { FaRegCopyright } from "react-icons/fa";
import { SlSocialFacebook, SlSocialLinkedin, SlSocialSkype, SlSocialTwitter, SlSocialYoutube } from "react-icons/sl";
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2'
import useUser from '../hooks/useUser';
import { FaFaceAngry, FaFaceFrown, FaFaceLaugh, FaFaceMeh, FaFaceSmileBeam } from "react-icons/fa6";

const Footer = () => {
    const [formData, setFormData] = useState({});
    const [selectedRating, setSelectedRating] = useState('');
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {currentUser}=useUser();
    const role = currentUser?.role

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value
        }));
    };

    const handleIconClick = (value) => {
        setSelectedRating(value);
        setFormData(prevFormData => ({
          ...prevFormData,
          rating: value
        }));
    };

    const handleSubmit = (e) => {
        if (!currentUser || !currentUser.email) {
            Swal.fire({
              position: "top-end",
              icon: "warning",
              title: "Please Login First!!!",
              showConfirmButton: false,
              timer: 1500
            });
            navigate('/login');
            return;
          }
        const updatedFormData = {
            ...formData,
            userEmail: currentUser?.email,
            userName:currentUser?.fullName
          };
        e.preventDefault();
            axiosSecure.post('http://localhost:5000/feedback', updatedFormData)
                .then((res) => {
                    Swal.fire({
                    title: 'Success!',
                    text: 'Successfully Sent the Feedback.',
                    icon: 'success',
                    timer: 1500
                    });
                    navigate('/');
                })
                .catch((error) => {
                    console.log(error);
                    Swal.fire({
                    title: 'Error!',
                    text: 'There was an error sending the feedback.',
                    icon: 'error',
                    timer: 1500
                    });
                });
            
        
    };

  return (
    <div className='bg-[#ead448]'>
        <div className='p-2 grid md:grid-cols-3 lg:grid-cols-3 gap-4 '>
            {/**logo and contact */}
            <div className='flex'>
                <img className='rounded-lg h-[75px] w-[75px] m-8'src={logo} alt="logo"/>
                <p className='m-8'><span className='text-1xl font-bold underline'> 
                Contact Us </span><br/><br/>
                Email : activelifeadm1@gmail.com<br/>
                Phone: +94 12 345 6789
                </p>
                <p className='text-md'></p>
            </div>
            {/**feedback button and form */}
            <div className='flex'>
                <p className='text-1xl m-8 underline font-bold'>Give Feedback<br/><br/>
                <Popup trigger=
                    {
                    <button className='px-7 py-3 rounded-lg border border-black hover:bg-secondary font-bold uppercase' 
                            title={role == 'admin' ? 'Admin cannot be available to add' : 'You can Add Diets'} 
                            disabled={role=='admin'}        
                    >
                        Feedback Form
                    </button>}modal nested>
                        {
                            close => (
                                <div className='modal'>
                                    <div className='w-[500px] mx-auto my-5'>
                                        <div className="bg-white p-8 rounded-lg text-center">
                                            <h2 className="text-3xl font-bold text-center mb-6 text-secondary">! Help Us to Improve !</h2>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                <form onSubmit={handleSubmit} className="text-center" >
                                                            <div className="w-[500px] mb-4">
                                                                <label className='block text-gray-700 front-bold mb-2'>
                                                                    How do you rate us?
                                                                </label>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleIconClick('Excellent')}
                                                                    style={{ color: selectedRating === 'Excellent' ? 'green' : 'black' }}
                                                                >
                                                                    <FaFaceLaugh  className='w-[50px] h-[50px]'/>
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleIconClick('Good')}
                                                                    style={{ color: selectedRating === 'Good' ? '#33cc33' : 'black' }}    
                                                                >
                                                                        <FaFaceSmileBeam className='w-[50px] h-[50px] font-bold'/>
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleIconClick('Okay')}
                                                                    style={{ color: selectedRating === 'Okay' ? '#e6b800' : 'black' }}
                                                                >
                                                                        <FaFaceMeh className='w-[50px] h-[50px]'/>
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleIconClick('Bad')}
                                                                    style={{ color: selectedRating === 'Bad' ? '#ff1a1a' : 'black' }}    
                                                                >
                                                                        <FaFaceFrown  className='w-[50px] h-[50px]'/>
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleIconClick('Very bad')}
                                                                    style={{ color: selectedRating === 'Very bad' ? '#cc0000' : 'black' }}    
                                                                >
                                                                        <FaFaceAngry  className='w-[50px] h-[50px]'/>
                                                                </button>
                                                            </div>
                                                            <div className="w-[500px] mb-4">
                                                                <label htmlFor="service" className='block text-gray-700 front-bold mb-2'>
                                                                    How often do you use our service?
                                                                </label>
                                                                <textarea 
                                                                    rows=""
                                                                    name="service"
                                                                    className="w-full border-gray-300 
                                                                    border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                                                                    onChange={handleChange}
                                                                    placeholder="">
                                                                </textarea>
                                                            </div>
                                                            <div className="w-[500px] mb-4">
                                                                <label htmlFor="suggesions" className='block text-gray-700 front-bold mb-2'>
                                                                    Any Suggestions?
                                                                </label>
                                                                <textarea 
                                                                    rows=""
                                                                    name="suggesions"
                                                                    className="w-full border-gray-300 
                                                                    border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                                                                    onChange={handleChange}
                                                                    placeholder="">
                                                                </textarea>
                                                            </div>
                                                    <div className="text-center">
                                                        <button type="submit" className="bg-[#f2e48d] justify-center hover:bg-secondary text-black font-bold py-2 px-4 
                                                        rounded focus:outline-none focus:shadow-outline">
                                                            Submit Details
                                                        </button>
                                                    </div><br/>
                                                    <div className="text-center">
                                                        <button onClick=
                                                            {() => close()} className="bg-red-300 justify-center hover:bg-red-500 text-black font-bold py-2 px-4 
                                                                rounded focus:outline-none focus:shadow-outline">
                                                                    Cancle
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                </Popup>
                </p>
            </div>
            {/**login and register */}
            <div className='flex'>
                <br/>
                <p className='text-center m-8'>
                    New User? 
                    <Link className='underline text-secondary' to="/register">Sign-up</Link><br/>
                    Already have an account? 
                    <Link to ="/login" className="underline text-secondary ml-1">Login</Link>
                </p>
            </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img className=' h-[70px] w-[1300px]'src={line} alt="line"/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <SlSocialSkype className='w-[30px] h-[30px] m-5'/>
            <SlSocialFacebook className='w-[30px] h-[30px] m-5'/>
            <SlSocialYoutube className='w-[30px] h-[30px] m-5'/>
            <SlSocialTwitter className='w-[30px] h-[30px] m-5'/>
            <SlSocialLinkedin className='w-[30px] h-[30px] m-5'/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <FaRegCopyright/>Copyright. All rights reserved.
        </div>
    </div>
  )
}

export default Footer