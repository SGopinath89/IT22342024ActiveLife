import React, { useContext, useEffect,useState } from 'react'
import useAxiosFetch from '../../hooks/useAxiosFetch'
import AuthProvider, { AuthContext } from '../../utilities/providers/AuthProvider';
import useUser from '../../hooks/useUser';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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
    const handleAdd = (id, name,img) => {
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
      .get(`/userDiet/${id}?email=${currentUser.email}`)
      .then((res) => {
        console.log(res.data.dietId);
        if (res.data.dietId === id) {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Already Added!!",
            showConfirmButton: false,
            timer: 1500
          });
        } else if (userDiets.find((item) => item.diets._id === id)) {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Already Added!!",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          const data = {
            dietName: name,
            dietId: id,
            userEmail: currentUser.email,
            dietImg:img,
            date: new Date(),
          };
          axiosSecure.post('/new-userDiet', data).then((res) => {
            console.log(res.data);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Successfully Added!!",
              showConfirmButton: false,
              timer: 1500
            });
          });
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

  return (
    <div className='md:w-[80%]mx-auto my-36'>
            <div>
                <h1 className='text-5xl font-bold text-center text-black dark:text-white'>Our <span className='text-secondary'>Diet</span> Plans</h1>
            </div>
            <br/>
            <div>
                <p className='text-2xl font-bold text-center text-black dark:text-white'>
                You can choose any Diet that suits your preferences and fitness goals. </p>
                <p className='text-2xl font-bold text-center text-black dark:text-white'>
                Comprehensive instructions, benefits and also downsides for each diet are provided, </p>                
                <p className='text-2xl font-bold text-center text-black dark:text-white'>
                ensuring you understand how to maintain your meals correctly.
                </p>
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
                                <button onClick={()=>handleAdd(diet._id,diet.name,diet.dietImg)} title={role == 'admin' ? 'Admin cannot be available to add' : 'You can Add Diets'} 
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
