import React from 'react'
import useUser from '../../../hooks/useUser'
import { Link } from 'react-router-dom';

const UserP = () => {
    const {currentUser} = useUser();

  return (
    <div className='h-screen justify-center flex items-center'>
        <div>
          <div>
                <div className=' flex items-center p-5'>
                  <h1 className='text-4xl capitalize font-bold'>  Hi, <span>{currentUser?.fullName}!!  </span>Welcome to your dashboard</h1>
                  <span><img className='shadow-lg rounded-lg h-[75px] w-[75px]'src={currentUser?.photoUrl} alt="Profile photo"/></span>
                </div>
                <div className='w-[1000px] shadow-lg rounded-lg p-3 flex flex-col justify-between border border-secondary overflow-hidden m-4'>
                    <div className='p-2 grid md:grid-cols-4 lg:grid-cols-4 gap-4 '>
                        
                        <div >
                          <p className='text-black mb-2 text-center'><span className='font-bold'>Full Name : </span>{currentUser?.fullName}</p>
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
                              <br/><br/>
                              <Link to="/dashboard/addHealthDetails">
                                <button 
                                className='shadow-lg px-7 py-3 rounded-lg bg-secondary font-bold uppercase text-center'>
                                    Add your Health Details
                                </button>
                              </Link>
                              </div>
                        </div>
                        <div className='text-center'>
                          <h2 className='font-bold'>Health Details</h2>
                        </div>
                    </div>
                </div>
          </div>
        </div>
    </div>
  )
}

export default UserP