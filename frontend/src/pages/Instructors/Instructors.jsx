import React, { useContext, useEffect,useState } from 'react'
import useAxiosFetch from '../../hooks/useAxiosFetch'
import AuthProvider, { AuthContext } from '../../utilities/providers/AuthProvider';
import useUser from '../../hooks/useUser';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Instructors = () => {
    const axiosFetch = useAxiosFetch();
    const [instructors,setInstructors] = useState([]);
    const navigate = useNavigate();
    const {currentUser}=useUser();
    const role=currentUser?.role;
    const [userInstructor,setUserInstructor]=useState([])
    const axiosSecure = useAxiosSecure();
    const [searchTerm,setSearchTerm] = useState("")

    useEffect(()=>{
        axiosFetch
          .get("/instructors")
          .then((res)=>setInstructors(res.data))
          .catch((err)=>console.log(err))
    },[axiosFetch])

    const handleRequest = (id,name,spe,iEmail) => {
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
    
        axiosSecure
          .get(`/userInstructor/${id}?email=${currentUser.email}`)
          .then((res) => {
            console.log(res.data.instructorId)
            if (res.data.instructorId === id) {
              Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Already Requested!!",
                showConfirmButton: false,
                timer: 1500
              });
            } else if (userInstructor.find((item) => item.instructors._id === id)) {
              Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Already Requested!!",
                showConfirmButton: false,
                timer: 1500
              });
            } else if(currentUser.email){
              const data = {
                instructorName:name,
                instructorId: id,
                userEmail: currentUser.email,
                userName:currentUser.fullName,
                speciality:spe,
                status:"Pending",
                instructorEmail:iEmail,
                data: new Date(),
              };
              axiosSecure.post('/new-userInstructor', data).then((res)=>{
                console.log(res.data)
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Requested Successfully!!! Contact the Instructor/Doctor!!",
                  showConfirmButton: false,
                  timer: 1500
                });
              })
              
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              position: "top-end",
              icon: "warning",
              title: "An error occurred. Please try again.",
              showConfirmButton: false,
              timer: 1500
            });
          });
          
    };

    const highlightText = (text, highlight) => {
      if (!highlight.trim()) {
        return text;
      }
      const regex = new RegExp(`(${highlight})`, 'gi');
      return text.split(regex).map((part, index) =>
        regex.test(part) ? (
          <span key={index} className="bg-yellow-200">{part}</span>
        ) : (
          part
        )
      );
    };
    
  return (
      <div className='md:w-[80%]mx-auto my-36'>
            <div>
                <h1 className='text-5xl font-bold text-center text-black dark:text-white'>Our <span className='text-secondary'> Doctors</span> and <span className='text-secondary'>Instructors</span></h1>
            </div>
            <br/>
            <div>
                <br/>
                <p className='text-2xl font-bold text-center text-black dark:text-white'>
                You can Request guidance from a professional and contact then through the details given.
                </p>
                <br/>
            </div>
            <div className='flex text-right' style={{ display: 'flex', justifyContent: 'right', alignItems: 'right'}}>
              <input id='searchInput' type='text' placeholder='Search' 
              className='border-gray-300 border rounded-md py-2 px-4'
              onChange={(event)=>{
                setSearchTerm(event.target.value)
              }}
              />
              <IoMdSearch className='w-[40px] h-[40px]'/>
            </div>
            {            
              instructors ? <>
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 '>
                  {
                      instructors
                      .filter((instructor)=>{
                        if(searchTerm ==""){
                          return instructor;
                        }else if(instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) 
                          || instructor.qualification.toLowerCase().includes(searchTerm.toLowerCase())
                          || instructor.experience.toLowerCase().includes(searchTerm.toLowerCase())
                          || instructor.specialities.toLowerCase().includes(searchTerm.toLowerCase())
                        ){
                            return instructor;
                          }
                        })
                      .map((instructor)=>(
                        <div key={instructor._id} className='shadow-lg rounded-lg p-3 flex flex-col justify-between border border-secondary overflow-hidden m-4 '>
                          <div className='p-4 '>
                              <h2 className='text-xl font-semibold mb-20 text-black dark:text-white text-center'>{highlightText(instructor.name, searchTerm)}</h2>
                              <p className='text-black mb-2 text-center dark:text-white'><span className='font-bold'>Email: </span>{highlightText(instructor.email, searchTerm)}</p>
                              <p className='text-black mb-2 text-center dark:text-white' ><span className='font-bold'>Contact Number: </span>{highlightText(instructor.phoneNo, searchTerm)}</p>
                              <p className='text-black mb-2 text-center dark:text-white'><span className='font-bold'>Qualifications: </span>{highlightText(instructor.qualification, searchTerm)}</p>
                              <p className='text-black mb-2 text-center dark:text-white'><span className='font-bold'>Experiences: </span>{highlightText(instructor.experience, searchTerm)}</p>
                              <p className='text-black mb-2 text-center dark:text-white'><span className='font-bold'>Specialities: </span>{highlightText(instructor.specialities, searchTerm)}</p>
                              <div className='text-center'>
                              <button onClick={()=>handleRequest(instructor._id,instructor.name,instructor.specialities,instructor.email)} title={role == 'admin' ? 'Admin cannot be available to add' : 'You can Add Diets'} 
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
