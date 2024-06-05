import React from 'react'
import logo from '/logo-black.png?url'
import line from '../assets/line.png'
import { FaRegCopyright } from "react-icons/fa";
import { SlSocialFacebook, SlSocialLinkedin, SlSocialSkype, SlSocialTwitter, SlSocialYoutube } from "react-icons/sl";
const Footer = () => {
  return (
    <div className='bg-[#ead448]'>
        <div className='p-2 grid md:grid-cols-3 lg:grid-cols-3 gap-4 '>
            <div className='flex'>
                <img className='shadow-lg rounded-lg h-[75px] w-[75px] m-8'src={logo} alt="logo"/>
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