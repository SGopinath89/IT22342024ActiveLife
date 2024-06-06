import React from 'react'
import logo from '/logo-black.png?url'
import line from '../assets/line.png'
import { FaRegCopyright } from "react-icons/fa";
import { SlSocialFacebook, SlSocialLinkedin, SlSocialSkype, SlSocialTwitter, SlSocialYoutube } from "react-icons/sl";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className='bg-[#ead448]'>
        <div className='p-2 grid md:grid-cols-3 lg:grid-cols-3 gap-4 '>
            <div className='flex'>
                <img className='rounded-lg h-[75px] w-[75px] m-8'src={logo} alt="logo"/>
                <p className='m-8'><span className='text-1xl font-bold underline'> 
                Contact Us </span><br/><br/>
                Email : activelifeadm1@gmail.com<br/>
                Phone: +94 12 345 6789
                </p>
                <p className='text-md'></p>
            </div>
            <div className='flex'>
                <p className='text-1xl m-8 underline font-bold'>Give Feedback<br/><br/>
                <Link to="/workouts"> 
                    <button className='px-7 py-3 rounded-lg border border-black hover:bg-secondary font-bold uppercase' >
                      Feedback Form
                    </button>
                </Link>
                </p>
            </div>
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