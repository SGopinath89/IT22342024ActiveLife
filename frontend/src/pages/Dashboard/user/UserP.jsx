import React from 'react'
import useUser from '../../../hooks/useUser'

const UserP = () => {
    const {currentUser} = useUser();

  return (
    <div className='h-screen justify-center flex items-center'>
        <div>
          <div>
                <div className='p-5'>
                  <h1 className='text-4xl capitalize font-bold'>  Hi, <span>{currentUser?.fullName}!!  </span>Welcome to your dashboard</h1>
                </div>
                <div className='w-full shadow-lg rounded-lg p-3 flex flex-col justify-between border border-secondary overflow-hidden m-4'>
                    <div className='p-4 grid md:grid-cols-2 lg:grid-cols-2 gap-4 '>
                        <div className='flex justify-center'>
                          <img className='shadow-lg rounded-lg h-[200px]'src={currentUser?.photoUrl} alt="Profile photo"/>
                        </div>
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
                              <button 
                              className='shadow-lg px-7 py-3 rounded-lg bg-secondary font-bold uppercase text-center'>
                                  Edit your Details
                              </button>
                              <br/><br/>
                              <button 
                              className='shadow-lg px-7 py-3 rounded-lg bg-secondary font-bold uppercase text-center'>
                                  Add your Health Details
                              </button>
                              </div>
                        </div>
                    </div>
                </div>
          </div>
        </div>
    </div>
  )
}

export default UserP