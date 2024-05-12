import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../../hooks/useAxiosFetch';

const Popular = () => {
    const axiosFetch = useAxiosFetch();
    const [workouts,setWorkouts] = useState([]);
    const [diets,setDiets] = useState([]);
    useEffect(()=>{
        const fetchWorkouts = async()=>{
            const response = await axiosFetch.get('/workouts')
            console.log(response.data);
            //setWorkouts(response.data);
        }
        fetchWorkouts();
    },[])
    return (
        <div className='md:w-[80%]mx-auto my-36'>
            <div>
                <h1 className='text-5xl font-bold text-center'>Our <span className='text-secondary'>Popular</span> Classes and Workouts</h1>
            </div>
        </div>
    )
}
export default Popular;