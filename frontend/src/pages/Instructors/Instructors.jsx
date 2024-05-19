import React, { useEffect,useState } from 'react'
import useAxiosFetch from '../../hooks/useAxiosFetch'
export const Instructors = () => {
  const axiosFetch = useAxiosFetch();
    const [instructors,setInstructors] = useState([]);
    useEffect(()=>{
        const fetchInstructor=async()=>{
            const response = await axiosFetch.get('/instructors')
            //console.log(response.data);
            setInstructors(response.data);
        }
        fetchInstructor()
    },[])
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
                                  <button className='shadow-lg px-7 py-3 rounded-lg bg-secondary font-bold uppercase text-center'>
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
