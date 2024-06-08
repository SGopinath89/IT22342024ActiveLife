import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser'
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UserP = () => {
    const {currentUser} = useUser();
    const axiosSecure = useAxiosSecure();
    const [loading,setLoading] = useState(true);
    const [userRecords,setUserRecords] = useState([]);
    const [dCount,setdCount] = useState();
    
    useEffect(() => {
      axiosSecure.get(`/userHealthRecord/${currentUser?.email}`)
        .then((res) => {
          setdCount(res.data.count);
          setUserRecords(res.data.documents || []);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, [axiosSecure]);

    if(loading){
      return <div>Loading...</div>
    }
  return (
    <div className='w-[1100px] h-screen justify-center flex items-center'>
        <div>
          <div>
                <div className=' flex items-center p-5'>
                  <h1 className='text-4xl capitalize font-bold'>  Hi, <span>{currentUser?.fullName}!!  </span>**Welcome to your dashboard**</h1>
                  <span></span>
                </div>
                <div className='w-[1000px] shadow-lg rounded-lg p-3 flex flex-col justify-between border border-secondary overflow-hidden'>
                    <div className='p-2 grid md:grid-cols-2 lg:grid-cols-2 gap-4 '>
                        <div >
                        <h1 className='justify-left font-bold text-2xl text-center'>- Personal Details -</h1>
                        <div className='justify-center'
                              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                          <img className='shadow-lg rounded-lg h-[75px] w-[75px]'src={currentUser?.photoUrl} alt="Profile photo"/>
                        </div>
                        <p className='text-black mb-2 text-center'><span className='font-bold'>Full Name : </span>{currentUser?.fullName}</p>
                          <p className='text-black mb-2 text-center'><span className='font-bold'>Email : </span>{currentUser?.email}</p>
                          <p className='text-black mb-2 text-center'><span className='font-bold'>Gender : </span>{currentUser?.gender}</p>
                          <p className='text-black mb-2 text-center'><span className='font-bold'>Phone Number : </span>{currentUser?.phoneNo}  </p>
                          <p className='text-black mb-2 text-center'><span className='font-bold'>Age : </span>{currentUser?.age}  </p>
                          <p className='text-black mb-2 text-center'><span className='font-bold'>Address : </span>{currentUser?.address}  </p>
                          <p className='text-black mb-2 text-center'><span className='font-bold'>Employment Status : </span>{currentUser?.employmentStatus}  </p>
                          <p className='text-black mb-2 text-center'><span className='font-bold'>Username : </span>{currentUser?.userName}  </p>
                          <p className='text-black mb-2 text-center'><span className='font-bold'>Password : </span>{currentUser?.password}  </p>
                          <br/>
                          <div className='text-center'>
                              <Link to='/dashboard/updateUserDetails'>
                                <button
                                className='shadow-lg px-7 py-3 rounded-lg bg-secondary font-bold uppercase text-center'>
                                    Edit your Details                                    
                                </button>
                              </Link>
                              <br/><br/>
                              
                              </div>
                        </div>
                        <div className='text-center'>
                          {
                            userRecords.map((record,index)=>(
                              <div key={record._id}>
                                <h1 className='justify-left font-bold text-2xl'>- Health Details -</h1>
                                <p className='text-black mb-2 text-center'><span className='font-bold'>Weight : </span>{record.weight}</p>
                                <p className='text-black mb-2 text-center'><span className='font-bold'>Height : </span>{record.height}</p>
                                <p className='text-black mb-2 text-center'><span className='font-bold'>Average Heart Rate : </span>{record.averageHeartRate}</p>
                                <p className='text-black mb-2 text-center'><span className='font-bold'>Average Blood Pressure : </span>{record.bloodPressure}  </p>
                                <p className='text-black mb-2 text-center'><span className='font-bold'>Stress Level (In a scale of 0 to 5) : </span>{record.stressScale}  </p>
                                <p className='text-black mb-2 text-center'><span className='font-bold'>Sleeping Hours : </span>{record.sleepHours}  </p>
                                <p className='text-black mb-2 text-center'><span className='font-bold'>Current Level of Physical Activity : </span>{record.currentLevelofPhysicalActivity}</p>
                                <p className='text-black mb-2 text-center'><span className='font-bold'>Existing Medical Condition : </span>{record.existingMedicalCondition}</p>
                                <p className='text-black mb-2 text-center'><span className='font-bold'>Any Surgeries : </span>{record.anySurgeries}</p>
                                <p className='text-black mb-2 text-center'><span className='font-bold'>Fitness Goals : </span>{record.fitnessGoals}  </p>
                                <p className='text-black mb-2 text-center'><span className='font-bold'>Any Allergies : </span>{record.AnyAllergies}  </p>
                                {
                                dCount === 0 && <Link to="/dashboard/addHealthDetails">
                                                      <button 
                                                      className='shadow-lg px-7 py-3 rounded-lg bg-secondary font-bold uppercase text-center'>
                                                          Add your Health Details
                                                      </button>
                                                    </Link>
                              }

                              {
                                dCount !=0 &&<Link to="/dashboard/updateHealthdetails">
                                                  <button 
                                                  className='shadow-lg px-7 py-3 rounded-lg bg-secondary font-bold uppercase text-center'>
                                                      Update your Health Details
                                                  </button>
                                                </Link>

                              }
                              </div>
                            ))
                          }
                        </div>
                    </div>
                </div>
          </div>
        </div>
    </div>
  )
}

export default UserP