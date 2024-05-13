import React, { useEffect,useState } from 'react'
import useAxiosFetch from '../../hooks/useAxiosFetch'
import CardI from './CardI'
const ContentI = () => {
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
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 '>
                {
                    instructors.map((item,index)=><CardI key={index} item={item}/>)
                }
            </div>
        </div>
  )
}
export default ContentI