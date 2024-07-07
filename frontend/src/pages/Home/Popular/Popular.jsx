import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import CardW from './cardW'
import CardD from './cardD'
import useUser from '../../../hooks/useUser'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Popular = () => {
    const axiosFetch = useAxiosFetch();
    const {currentUser} = useUser();
    const [workouts,setWorkouts] = useState([]);
    const [diets,setDiets] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [dCount,setdCount] = useState();

    useEffect(()=>{
        const fetchWorkouts = async()=>{
            const response = await axiosFetch.get('http://localhost:5000/workout')
            setWorkouts(response.data);
        }
        fetchWorkouts();
    },[])
    useEffect(()=>{
        const fetchDiets = async()=>{
            const response = await axiosFetch.get('http://localhost:5000/diet')
            setDiets(response.data);
        }
        fetchDiets();
    },[])

    useEffect(() => {
        axiosSecure.get(`http://localhost:5000/userHR/${currentUser?.email}`)
        .then((res) => {
            setdCount(res.data.count);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [axiosSecure]);

    return (

        <div className='md:w-[80%]mx-auto my-36'>

            {
                (currentUser && currentUser.role ==="user" && dCount === 0) && 
                <div>
                    <h3 className=' text-2xl p-4 bg-secondary font-bold text-center dark:text-white'>
                        To receive personalized recommendations, please provide your health details in the Dashboard.
                        <br />
                        <Link to='/dashboard/addHealthDetails' className='underline'>
                        Click Here to add Health Details
                        </Link>
                    </h3>
                </div>
            }
            <br/><br/>
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