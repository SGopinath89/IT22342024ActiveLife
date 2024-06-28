import React, { useContext, useEffect,useState } from 'react'
import useAxiosFetch from '../../hooks/useAxiosFetch'
import AuthProvider, { AuthContext } from '../../utilities/providers/AuthProvider';
import useUser from '../../hooks/useUser';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Workouts = () => {
  const axiosFetch = useAxiosFetch();
  const [workouts,setWorkouts] = useState([]);
  const navigate = useNavigate();
  const {currentUser}=useUser();
  const role=currentUser?.role;
  const [userWoukouts,setUserWoukouts]=useState([])
  const axiosSecure = useAxiosSecure();
  const [searchTerm,setSearchTerm] = useState("")
  
    useEffect(()=>{
      axiosFetch
        .get("http://localhost:5000/workout")
        .then((res)=>setWorkouts(res.data))
        .catch((err)=>console.log(err))
    },[axiosFetch])

    const handleAdd = (id,name,img,days) => {
      if (!currentUser || !currentUser.email) {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Please Login First!!!",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/login');
        return;
      }  
      axiosSecure
        .get(`http://localhost:5000/userWorkout/byId/${id}?email=${currentUser.email}`)
        .then((res) => {
          console.log(res.data.workoutId)
          if (res.data.workoutId === id) {
            Swal.fire({
              position: "top-end",
              icon: "warning",
              title: "Already Added!!",
              showConfirmButton: false,
              timer: 1500
            });
          } else if (userWoukouts.find((item) => item.workouts._id === id)) {
            Swal.fire({
              position: "top-end",
              icon: "warning",
              title: "Already Added!!",
              showConfirmButton: false,
              timer: 1500
            });
          } else if(currentUser.email){
            const data = {
              workoutName:name,
              workoutId: id,
              workoutImg:img,
              totaldays:days,
              userEmail: currentUser.email,
              data: new Date(),
            };
            axiosSecure.post('http://localhost:5000/userWorkout', data).then((res)=>{
              console.log(res.data)
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Added Successfully!!",
                showConfirmButton: false,
                timer: 1500
              });
            })
            
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "An error occurred. Please try again.",
            showConfirmButton: false,
            timer: 1500
          });
        });
        
    };

    const highlightText = (text, highlight) => {
      if (!highlight.trim()) {
        return text;
      }
      const regex = new RegExp(`(${highlight})`, 'gi');
      return text.split(regex).map((part, index) =>
        regex.test(part) ? (
          <span key={index} className="bg-yellow-200">{part}</span>
        ) : (
          part
        )
      );
    };
    

  return (
    <div className='md:w-[80%]mx-auto my-36'>
            <div>
                <h1 className='text-5xl font-bold text-center text-black dark:text-white'>Our <span className='text-secondary'>Workout </span>Plans</h1>
            </div>
            <br/>
            <div>
                <p className='text-2xl font-bold text-center text-black dark:text-white'>
                You can choose any workout that suits your preferences and fitness goals. </p>
                <p className='text-2xl font-bold text-center text-black dark:text-white'>
                We allow you to keep a record of the number of days you have completed each workout, </p>
                <p className='text-2xl font-bold text-center text-black dark:text-white'>
                helping you stay on track and monitor your progress. </p>
                <p className='text-2xl font-bold text-center text-black dark:text-white'>
                Comprehensive instructions for each workout are provided in easy-to-follow steps, </p>                
                <p className='text-2xl font-bold text-center text-black dark:text-white'>
                ensuring you understand how to perform each exercise correctly and effectively.
                </p>
                <br/>
            </div>
            <div className='flex text-right' style={{ display: 'flex', justifyContent: 'right', alignItems: 'right'}}>
              <input id='searchInput' type='text' placeholder='Search' 
              className='border-gray-300 border rounded-md py-2 px-4'
              onChange={(event)=>{
                setSearchTerm(event.target.value)
              }}
              />
              <IoMdSearch className='w-[40px] h-[40px]'/>
            </div>
            {
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 '>
                {
                    workouts
                    .filter((workout)=>{
                      if(searchTerm ==""){
                        return workout;
                      }else if(workout.name.toLowerCase().includes(searchTerm.toLowerCase()) 
                        || workout.numberOfDays.toString().toLowerCase().includes(searchTerm.toLowerCase())
                        || workout.howToDo.toLowerCase().includes(searchTerm.toLowerCase())
                      ){
                          return workout;
                        }
                      })
                    .map((workout)=>(
                      <div key={workout._id} className='shadow-lg rounded-lg p-3 flex flex-col justify-between border border-secondary overflow-hidden m-4'>
                        <div className='p-4'>
                            <h2 className='text-xl font-semibold mb-20 dark:text-white text-center'>{highlightText(workout.name, searchTerm)}
                              <div className='text-gray-600 mb-2 text-center text-sm'>
                                For: {workout.forGoal.map((goal, index) => (
                                  <React.Fragment key={index}>
                                    {highlightText(goal,searchTerm)}
                                    {index !== workout.forGoal.length - 1 && <br />}
                                  </React.Fragment>
                                ))}
                              </div>    
                            </h2>
                            <div className='flex justify-center'>
                              <img className='shadow-lg rounded-lg'src={workout.workoutImg} alt="Workout Image"/>
                            </div>
                            <br/>
                            <p className='text-black mb-2 text-center dark:text-white'><span className='font-bold'>Total Number of Days: </span>{highlightText(workout.numberOfDays.toString(), searchTerm)}</p>
                            <p className='text-black mb-2 text-center dark:text-white'><span className='font-bold'>Steps :</span>
                            
                            {workout.howToDo.split(' ').map((word, index) => {
                              const highlightedWord = highlightText(word, searchTerm);
                              return word === "Step" ? (
                                <React.Fragment key={index}>
                                  <br /> <span className="font-bold">{highlightedWord} </span>
                                </React.Fragment>
                              ) : (
                                <React.Fragment key={index}>
                                  {highlightedWord}{" "}
                                </React.Fragment>
                              );
                            })}
                            </p><br/>
                            <div className='text-center'>
                            <button onClick={()=>handleAdd(workout._id,workout.name,workout.workoutImg,workout.numberOfDays)} title={role == 'admin' ? 'Admin cannot be available to add' : 'You can Add Workouts'} 
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

