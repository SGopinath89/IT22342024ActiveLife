import React, { useContext, useEffect,useState } from 'react'
import useAxiosFetch from '../../hooks/useAxiosFetch'
import AuthProvider, { AuthContext } from '../../utilities/providers/AuthProvider';
import useUser from '../../hooks/useUser';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export const Workouts = () => {
  const axiosFetch = useAxiosFetch();
  const [workouts,setWorkouts] = useState([]);
  const navigate = useNavigate();
  const {currentUser}=useUser();
  //console.log(currentUser)
  const role=currentUser?.role;
  const [userWoukouts,setUserWoukouts]=useState([])
  const axiosSecure = useAxiosSecure();
  
    useEffect(()=>{
      axiosFetch
        .get("/workouts")
        .then((res)=>setWorkouts(res.data))
        .catch((err)=>console.log(err))
    },[axiosFetch])

    const handleAdd = (id,name) => {
      axiosSecure
        .get(`/userWorkout/${id}?email=${currentUser.email}`)
        .then((res) => {
          console.log(res.data.workoutId)
          if (res.data.workoutId === id) {
            alert("Already Added!");
          } else if (userWoukouts.find((item) => item.workouts._id === id)) {
            alert("Already Added!");
          } else if(currentUser.email){
            const data = {
              workoutName:name,
              workoutId: id,
              userEmail: currentUser.email,
              data: new Date(),
            };
            axiosSecure.post('/new-userWorkout', data).then((res)=>{
              console.log(res.data)
              alert("Added Successfully!!")
            })
            
          }
        })
        .catch((err) => console.log(err));
        if(!currentUser){
          alert("Please login First!!")
          navigate('/login');
        }
    };


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
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 '>
                {
                    workouts.map((workout)=>(
                      <div key={workout._id} className='shadow-lg rounded-lg p-3 flex flex-col justify-between border border-secondary overflow-hidden m-4'>
                        <div className='p-4'>
                            <h2 className='text-xl font-semibold mb-20 dark:text-white text-center'>{workout.name}</h2>
                            <div className='flex justify-center'>
                              <img className='shadow-lg rounded-lg'src={workout.workoutImg} alt="Workout Image"/>
                            </div>
                            <br/>
                            <p className='text-black mb-2 text-center dark:text-white'><span className='font-bold'>Total Number of Days: </span>{workout.numberOfDays}</p>
                            <p className='text-black mb-2 text-center dark:text-white'><span className='font-bold'>Steps :</span>
                            
                              {workout.howToDo.split(' ').map((word,index )=> {
                                  if (word === "Step") {
                                      return (
                                        <React.Fragment key={index}>
                                          <br /> <span className="font-bold">{word} </span>
                                          </React.Fragment>
                                      );
                                  } else {
                                  return word + ' ';
                                  }
                              })}
                          
                            </p><br/>
                            <div className='text-center'>
                            <button onClick={()=>handleAdd(workout._id,workout.name)} title={role == 'admin' ? 'Admin cannot be available to add' : 'You can Add Workouts'} 
                                disabled={role=='admin'}
                                className='shadow-lg px-7 py-3 rounded-lg bg-secondary font-bold uppercase text-center'>
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

