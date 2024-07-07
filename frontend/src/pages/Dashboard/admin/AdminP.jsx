import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser'
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AdminP = () => {
  const {currentUser} = useUser();
  //const axiosSecure = useAxiosSecure();

  return (
    <div className='w-screen h-screen justify-top items-center'>
        <div className="bg-white p-8 w-[1000px] rounded-lg ">
          <div className=' flex items-center p-5'>
            <h1 className='text-4xl capitalize font-bold'>  Hi, <span>{currentUser?.fullName}!!  </span>Welcome to your dashboard</h1>
          </div><br/>
          <div className='p-2 grid md:grid-cols-2 lg:grid-cols-2 gap-4 '>
            <div className='w-full'>
              <h1 className='text-2xl capitalize font-bold text-center'>- Your Details -</h1><br/>
              <p className='text-black mb-2 text-center'><span className='font-bold'>Email : </span>{currentUser?.email}</p>
              <p className='text-black mb-2 text-center'><span className='font-bold'>Gender : </span>{currentUser?.gender}</p>
              <p className='text-black mb-2 text-center'><span className='font-bold'>Phone Number : </span>{currentUser?.phoneNo}  </p>
              <p className='text-black mb-2 text-center'><span className='font-bold'>Age : </span>{currentUser?.age}  </p>
              <p className='text-black mb-2 text-center'><span className='font-bold'>Address : </span>{currentUser?.address}  </p>
              <p className='text-black mb-2 text-center'><span className='font-bold'>Employment Status : </span>{currentUser?.employmentStatus}  </p>
              <br/>
              <div className='text-center'>
                    <Link to='/dashboard/updateUserDetails'>
                        <button
                        className='shadow-lg px-7 py-3 rounded-lg bg-secondary font-bold uppercase text-center'>
                          Edit your Details                                    
                        </button>
                      </Link> 
              </div>
            </div>
            <div className='w-full'>
                <br/>
                <div className='text-center'>
                    <Link to='/dashboard/addDiet'>
                        <button
                        className='shadow-lg px-7 py-3 rounded-lg bg-secondary font-bold uppercase text-center'>
                          Add Diet                                    
                        </button>
                      </Link> 
                </div> <br/>
                <div className='text-center'>
                    <Link to='/dashboard/addWorkout'>
                        <button
                        className='shadow-lg px-7 py-3 rounded-lg bg-secondary font-bold uppercase text-center'>
                          Add Workout                                    
                        </button>
                      </Link> 
                </div> <br/>
                <div className='text-center'>
                    <Link to='/dashboard/addInstructor'>
                        <button
                        className='shadow-lg px-7 py-3 rounded-lg bg-secondary font-bold uppercase text-center'>
                          Add Instructor                                    
                        </button>
                      </Link> 
                </div> <br/>
            </div>     
          </div>
        </div>
    </div>
  )
}

export default AdminP