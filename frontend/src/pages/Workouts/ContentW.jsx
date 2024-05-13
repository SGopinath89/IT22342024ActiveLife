import React, { useEffect,useState } from 'react'
import useAxiosFetch from '../../hooks/useAxiosFetch'
import CardW from './CardW'
const ContentW = () => {
    const axiosFetch = useAxiosFetch();
    const [workouts,setWorkouts] = useState([]);
    useEffect(()=>{
        const fetchWorkouts = async()=>{
            const response = await axiosFetch.get('/workouts')
            //console.log(response.data);
            setWorkouts(response.data);
        }
        fetchWorkouts();
    },[])
  return (
        <div className='md:w-[80%]mx-auto my-36'>
            <div>
                <h1 className='text-5xl font-bold text-center text-black dark:text-white'>Our <span className='text-secondary'>Workouts</span></h1>
            </div>
            <br/>
            <div>
                <br/>
                <h1 className='text-3xl font-bold text-center text-black dark:text-white'>Description</h1>
                <br/>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 '>
                {
                    workouts.map((item,index)=><CardW key={index} item={item}/>)
                }
            </div>
        </div>
  )
}
export default ContentW