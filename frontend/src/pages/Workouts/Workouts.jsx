import React, { useEffect,useState } from 'react'
import useAxiosFetch from '../../hooks/useAxiosFetch'

export const Workouts = () => {
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
                <h1 className='text-5xl font-bold text-center text-black dark:text-white'>Our <span className='text-secondary'>Workout </span>Plans</h1>
            </div>
            <br/>
            <div>
                <br/>
                <h1 className='text-3xl font-bold text-center text-black dark:text-white'>Description</h1>
                <br/>
            </div>
            {
              workouts?<>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 '>
                {
                    workouts.map((workout,w)=>(
                      <div className='shadow-lg rounded-lg p-3 flex flex-col justify-between border border-secondary overflow-hidden m-4'>
                        <div className='p-4'>
                            <h2 className='text-xl font-semibold mb-20 dark:text-white text-center'>{workout.name}</h2>
                            <p className='text-black mb-2 text-center dark:text-white'><span className='font-bold'>Total Number of Days: </span>{workout.numberOfDays}</p>
                            <p className='text-black mb-2 text-center dark:text-white'><span className='font-bold'>Steps :</span>
                            
                              {workout.howToDo.split(' ').map(word => {
                                  if (word === "Step") {
                                      return (
                                          <React.Fragment >
                                          <br /> <span className="font-bold">{word} </span>
                                          </React.Fragment>
                                      );
                                  } else {
                                  return word + ' ';
                                  }
                              })}
                          
                            </p><br/>
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
              </>:<></>
            }

        </div>
  )
}
