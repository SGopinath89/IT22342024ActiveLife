import React, { useEffect,useState } from 'react'
import useAxiosFetch from '../../hooks/useAxiosFetch'
export const Diets = () => {
  const axiosFetch = useAxiosFetch();
    const [diets,setDiets] = useState([]);
    useEffect(()=>{
        const fetchDiets = async()=>{
            const response = await axiosFetch.get('/diets')
            setDiets(response.data);
        }
        fetchDiets();
    },[])
  return (
    <div className='md:w-[80%]mx-auto my-36'>
            <div>
                <h1 className='text-5xl font-bold text-center text-black dark:text-white'>Our <span className='text-secondary'>Diet</span> Plans</h1>
            </div>
            <br/>
            <div>
                <br/>
                <h1 className='text-3xl font-bold text-center text-black dark:text-white'>Description</h1>
                <br/>
            </div>
            {
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 '>
                {
                    diets.map((diet,index)=>(
                      
                      <div className='shadow-lg rounded-lg p-3 flex flex-col justify-between border border-secondary overflow-hidden m-4'>
                        <div className='p-4'>
                            <h2 className='text-xl font-semibold mb-10 dark:text-white text-center'>{diet.name}</h2>
                            <div className='flex justify-center'>
                              <img className='shadow-lg rounded-lg'src={diet.dietImg} alt="Diet Image"/>
                            </div>
                            <br/>
                            <p className='text-black mb-2 text-center dark:text-white'><span className='font-bold'>How it Works : </span>{diet.howItWorks}</p>
                            <p className='text-black mb-2 text-center dark:text-white'><span className='font-bold'>Benefits : </span>{diet.benefits}  </p>
                            <p className='text-gray-600 mb-2 text-center'><span className='font-bold'>Downsides : </span>{diet.downsides}  </p>
                            <br/>
                            <div className='text-center'>
                                <button className='shadow-lg px-7 py-3 rounded-lg bg-secondary font-bold uppercase text-center'>
                                    Add
                                </button>
                            </div>
                        </div>
                      </div>
                    ))
                }
              </div>
            }
            
        </div>
  )
}
