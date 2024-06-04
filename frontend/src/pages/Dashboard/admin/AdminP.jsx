import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser'
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AdminP = () => {
  const {currentUser} = useUser();
  //const axiosSecure = useAxiosSecure();

  return (
    <div className='w-[1100px] h-screen justify-center flex items-center'>
        <div>
          <div>
                <div className=' flex items-center p-5'>
                  <h1 className='text-4xl capitalize font-bold'>  Hi, <span>{currentUser?.fullName}!!  </span>Welcome to your dashboard</h1>
                </div>
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
                <div className='text-center'>
                    <Link to='/dashboard/updateAdminDetails'>
                        <button
                        className='shadow-lg px-7 py-3 rounded-lg bg-secondary font-bold uppercase text-center'>
                          Edit your Details                                    
                        </button>
                      </Link> 
                </div>     
          </div>
        </div>
    </div>
  )
}

export default AdminP