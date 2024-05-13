import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import CardW from './cardW'
import CardD from './cardD'
const Popular = () => {
    const axiosFetch = useAxiosFetch();
    const [workouts,setWorkouts] = useState([]);
    const [diets,setDiets] = useState([]);
    useEffect(()=>{
        const fetchWorkouts = async()=>{
            const response = await axiosFetch.get('/workouts')
            //console.log(response.data);
            setWorkouts(response.data);
        }
        fetchWorkouts();
    },[])
    //console.log(workouts)
    useEffect(()=>{
        const fetchDiets = async()=>{
            const response = await axiosFetch.get('/diets')
            //console.log(response.data);
            setDiets(response.data);
        }
        fetchDiets();
    },[])

    return (
        <div className='md:w-[80%]mx-auto my-36'>
            <div>
                <h1 className='text-5xl font-bold text-center dark:text-white'>Our <span className='text-secondary'>Popular</span> Workouts and Diets</h1>
            </div>
            <br/>
            <div>
                <br/>
                <h1 className='text-3xl font-bold text-center text-secondary'>Workouts</h1>
                <br/>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 '>
                {
                    workouts.slice(0,3).map((item,index)=><CardW key={index} item={item}/>)
                }
            </div>
            <div>
                <br/>
                <h1 className='text-3xl font-bold text-center text-secondary'>Diets</h1>
                <br/>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 '>
                
                {
                    diets.slice(0,3).map((item,index)=><CardD key={index} item={item}/>)
                }
            </div>
        </div>
    )
}
export default Popular;