import React, { useEffect,useState } from 'react'
import useAxiosFetch from '../../hooks/useAxiosFetch'
import CardD from './CardD'
const ContentD = () => {
    const axiosFetch = useAxiosFetch();
    const [diets,setDiets] = useState([]);
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
                <h1 className='text-5xl font-bold text-center text-black dark:text-white'>Our <span className='text-secondary'>Diets</span></h1>
            </div>
            <br/>
            <div>
                <br/>
                <h1 className='text-3xl font-bold text-center text-black dark:text-white'>Description</h1>
                <br/>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 '>
                {
                    diets.map((item,index)=><CardD key={index} item={item}/>)
                }
            </div>
        </div>
  )
}
export default ContentD