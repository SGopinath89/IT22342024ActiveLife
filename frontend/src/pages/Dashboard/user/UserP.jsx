import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser'
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2'

const UserP = () => {
    const {currentUser} = useUser();
    const axiosSecure = useAxiosSecure();
    const [loading,setLoading] = useState(true);
    const [userRecords,setUserRecords] = useState([]);
    const [dCount,setdCount] = useState();
    const navigate = useNavigate();
    
    useEffect(() => {
      axiosSecure.get(`http://localhost:5000/userHR/${currentUser?.email}`)
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

    const handleDelete=(email)=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`http://localhost:5000/user/byEmail-allDetails/${email}`)
          .then((res)=>{
            Swal.fire({
              title: "Deleted!",
              text: "Successfully Deleted your Your Account and All your details.",
              icon: "success"
            });
            navigate('/') 
          })
          .catch((error)=>{
            console.log(error)
          })
        }
      });
    }

    const handleDeleteHRec=(email)=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`http://localhost:5000/userHR/${email}`)
          .then((res)=>{
            Swal.fire({
              title: "Deleted!",
              text: "Successfully Deleted your health Record.",
              icon: "success"
            }); 
          })
          .catch((error)=>{
            console.log(error)
          })
        }
      });
    }

    if(loading){
      return <div>Loading...</div>
    }
  return (
    <div className='w-[1070px] h-screen px-10'>
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
                                <span className='px-3'>
                                  <button onClick={()=>handleDelete(currentUser.email)} 
                                  className='px-3 py-3 cursor-pointer bg-red-500 rounded-3xl text-white font-bold'>
                                    <MdDelete/>
                                  </button>
                                </span>
                              <br/><br/>
  
                            </div>
   
                        </div>
                        <div className='text-center'>
                            {
                                dCount === 0 && <Link to="/dashboard/addHealthDetails">
                                                    <button 
                                                      className='shadow-lg px-7 py-3 rounded-lg bg-secondary font-bold uppercase text-center'>
                                                          Add your Health Details
                                                      </button>
                                                    </Link>
                            }
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
                                <p className='text-black mb-2 text-center'><span className='font-bold'>Fitness Goals : </span>                          
                                  <div>
                                    {record.fitnessGoals.map((goal, index) => (
                                      <React.Fragment key={index}>
                                        {goal}
                                        {index !== record.fitnessGoals.length - 1 && <br />}
                                      </React.Fragment>
                                    ))}
                                  </div>
                                </p>
                                <p className='text-black mb-2 text-center'><span className='font-bold'>Any Allergies : </span>{record.AnyAllergies}  </p>


                              {
                                dCount !=0 &&<div>
                                                <Link to="/dashboard/updateHealthdetails">
                                                  <button 
                                                  className='shadow-lg px-7 py-3 rounded-lg bg-secondary font-bold uppercase text-center'>
                                                      Update your Health Details
                                                  </button>
                                                </Link>
                                                <span className='px-3'>
                                                  <button onClick={()=>handleDeleteHRec(currentUser.email)} 
                                                  className='px-3 py-3 cursor-pointer bg-red-500 rounded-3xl text-white font-bold'>
                                                    <MdDelete/>
                                                  </button>
                                                </span>
                                              </div>
                                                

                              }
                              </div>
                            ))
                          }
                        </div>
                    </div>
                </div>
          </div>
          <br/>
        </div>
    </div>
  )
}

export default UserP