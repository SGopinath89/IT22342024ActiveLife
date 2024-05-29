import React, { useContext, useEffect,useState } from 'react'
import useAxiosFetch from '../../hooks/useAxiosFetch'
import AuthProvider, { AuthContext } from '../../utilities/providers/AuthProvider';
import useUser from '../../hooks/useUser';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Diets = () => {
  const navigate = useNavigate();
  const axiosFetch = useAxiosFetch();
  const [diets,setDiets] = useState([]);
  const {currentUser}=useUser();
  //console.log(currentUser)
  const role=currentUser?.role;
  const [userDiets,setUserDiets]=useState([])
  
  const axiosSecure = useAxiosSecure();

  useEffect(()=>{
    axiosFetch
      .get("/diets")
      .then((res)=>{setDiets(res.data)})
      .catch((err)=>console.log(err))
  },[axiosFetch]);
  
  //handle add button
  /*const handleAdd = (id,name) => {
    axiosSecure
      .get(`/userDiet/${id}?email=${currentUser.email}`)
      .then((res) => {
        console.log(res.data.dietId)
        if (res.data.dietId === id) {
          alert("Already Added!");
        } else if (userDiets.find((item) => item.diets._id === id)) {
          alert("Already Added!");
        } else if(currentUser.email){
          const data = {
            dietName:name,
            dietId: id,
            userEmail: currentUser.email,
            data: new Date(),
          };
          axiosSecure.post('/new-userDiet', data).then((res)=>{
            console.log(res.data)
            alert("Added Successfully!!")
          })
          
        }
      }).catch((err) =>{
        if(!currentUser.email){
          alert("Please login First!!")
          navigate('/login');
        }
        console.log(err)
        alert("Please login First!!");
        navigate('/login');
      } );
      
  };*/
  const handleAdd = (id, name) => {
    if (!currentUser || !currentUser.email) {
      alert("Please login First!!");
      navigate('/login');
      return;
    }
  
    axiosSecure
      .get(`/userDiet/${id}?email=${currentUser.email}`)
      .then((res) => {
        console.log(res.data.dietId);
        if (res.data.dietId === id) {
          alert("Already Added!");
        } else if (userDiets.find((item) => item.diets._id === id)) {
          alert("Already Added!");
        } else {
          const data = {
            dietName: name,
            dietId: id,
            userEmail: currentUser.email,
            date: new Date(),
          };
          axiosSecure.post('/new-userDiet', data).then((res) => {
            console.log(res.data);
            alert("Added Successfully!!");
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred. Please try again.");
      });
  };

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
                    diets.map((diet)=>(
                      
                      <div key={diet._id} className='shadow-lg rounded-lg p-3 flex flex-col justify-between border border-secondary overflow-hidden m-4'>
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
                                <button onClick={()=>handleAdd(diet._id,diet.name)} title={role == 'admin' ? 'Admin cannot be available to add' : 'You can Add Diets'} 
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

export default Diets
