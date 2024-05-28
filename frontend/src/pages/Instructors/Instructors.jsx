import React, { useContext, useEffect,useState } from 'react'
import useAxiosFetch from '../../hooks/useAxiosFetch'
import AuthProvider, { AuthContext } from '../../utilities/providers/AuthProvider';
import useUser from '../../hooks/useUser';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export const Instructors = () => {
    const axiosFetch = useAxiosFetch();
    const [instructors,setInstructors] = useState([]);
    const navigate = useNavigate();
    const {currentUser}=useUser();
    //console.log(currentUser)
    const role=currentUser?.role;
    const [userInstructor,setUserInstructor]=useState([])
    const axiosSecure = useAxiosSecure();
    useEffect(()=>{
        axiosFetch
          .get("/instructors")
          .then((res)=>setInstructors(res.data))
          .catch((err)=>console.log(err))
    },[axiosFetch])

    const handleRequest = (id,name) => {
        axiosSecure
          .get(`/userInstructor/${id}?email=${currentUser.email}`)
          .then((res) => {
            console.log(res.data.instructorId)
            if (res.data.instructorId === id) {
              alert("Already Added!");
            } else if (userInstructor.find((item) => item.instructors._id === id)) {
              alert("Already Added!");
            } else if(currentUser.email){
              const data = {
                instructorName:name,
                instructorId: id,
                userEmail: currentUser.email,
                data: new Date(),
              };
              axiosSecure.post('/new-userInstructor', data).then((res)=>{
                console.log(res.data)
                alert("Requested Successfully... Contact the Instructor/Doctor!!")
              })
              
            }
          })
          .catch((err) => console.log(err));
          if(!currentUser){
            alert("Please login First!!")
            navigate('/login');
          }
      };
  return (
      <div className='md:w-[80%]mx-auto my-36'>
            <div>
                <h1 className='text-5xl font-bold text-center text-black dark:text-white'>Our <span className='text-secondary'> Doctors</span> and <span className='text-secondary'>Instructors</span></h1>
            </div>
            <br/>
            <div>
                <br/>
                <h1 className='text-3xl font-bold text-center text-black dark:text-white'>Description</h1>
                <br/>
            </div>
            {            
              instructors ? <>
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 '>
                  {
                      instructors.map((instructor,i)=>(
                        <div key={instructor._id} className='shadow-lg rounded-lg p-3 flex flex-col justify-between border border-secondary overflow-hidden m-4 '>
                          <div className='p-4 '>
                              <h2 className='text-xl font-semibold mb-20 text-black dark:text-white text-center'>{instructor.name}</h2>
                              <p className='text-black mb-2 text-center dark:text-white'><span className='font-bold'>Email: </span>{instructor.email}</p>
                              <p className='text-black mb-2 text-center dark:text-white' ><span className='font-bold'>Contact Number: </span>{instructor.phoneNo}</p>
                              <p className='text-black mb-2 text-center dark:text-white'><span className='font-bold'>Qualifications: </span>{instructor.qualification}</p>
                              <p className='text-black mb-2 text-center dark:text-white'><span className='font-bold'>Experiences: </span>{instructor.experience}</p>
                              <p className='text-black mb-2 text-center dark:text-white'><span className='font-bold'>Specialities: </span>{instructor.specialities}</p>
                              <div className='text-center'>
                              <button onClick={()=>handleRequest(instructor._id,instructor.name)} title={role == 'admin' ? 'Admin cannot be available to add' : 'You can Add Diets'} 
                                disabled={role=='admin'}
                                className='shadow-lg px-7 py-3 rounded-lg bg-secondary font-bold uppercase text-center'>
                                    Request
                                </button>
                              </div>
                          </div>
                      </div>
                      ))
                  }
              </div>
              </>:<></>
            }
            
        </div>
  )
}
