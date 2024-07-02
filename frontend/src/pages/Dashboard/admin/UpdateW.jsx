import React, { useState, useEffect } from 'react';
import useUser from '../../../hooks/useUser';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link,  useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateW = () => {
    const { workoutId } = useParams();
    const { currentUser, refetch } = useUser();
    const [workoutData, setworkoutData] = useState({
        name: "",
        numberOfDays: "",
        howToDo: "",
        workoutImg: ""
    });
    const [formData, setFormData] = useState({});
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser?.email) {
            axiosSecure.get(`http://localhost:5000/workout/${workoutId}`)
                .then((res) => {
                    setworkoutData({
                        name: res.data.name,
                        numberOfDays: res.data.numberOfDays,
                        howToDo: res.data.howToDo,
                        workoutImg: res.data.workoutImg
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [axiosSecure, currentUser?.email]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {  
        e.preventDefault();
        axiosSecure.patch(`http://localhost:5000/workout/${workoutId}`, formData)
            .then((res) => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Workout details have been updated.',
                    icon: 'success',
                });
                refetch();
                navigate('/dashboard/manageWorkouts');
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error updating Workout.',
                    icon: 'error',
                });
            });
    };
  return (
    <div className='w-full justify-center items-center bg-white dark:bg-black flex'>
        <div className="bg-white p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold text-center mb-6 text-secondary">Edit Workout</h2>
            <form onSubmit={handleSubmit} className="text-center">
                <div className="flex items-center gap-5 md:grid-cols-2 lg:grid-cols-2">
                    <div>
                        <div className="w-[300px] mb-4">
                            <label htmlFor="name" className='block text-gray-700 front-bold mb-2'>
                                Name of the Workout
                            </label>
                            <input 
                            type='text' 
                            name="name"
                            placeholder={workoutData.name} 
                            onChange={handleChange}
                            className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                            focus:border-blue-300"/>
                        </div>
                        <div className="w-[300pxpx] mb-4">
                            <label htmlFor="workoutImg" className='block text-gray-700 front-bold mb-2'>
                            Workout Image
                            </label>
                            <input 
                            type='text' 
                            name="workoutImg"
                            placeholder={workoutData.workoutImg} 
                            onChange={handleChange}
                            className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                            focus:border-blue-300"/>
                        </div>
                        <div className="w-[300pxpx] mb-4">
                            <label htmlFor="numberOfDays" className='block text-gray-700 front-bold mb-2'>
                            Number Of Days
                            </label>
                            <input 
                            type='text' 
                            name="numberOfDays"
                            placeholder={workoutData.numberOfDays} 
                            onChange={handleChange}
                            className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                            focus:border-blue-300"/>
                        </div>
                    </div>
                    <div>
                        
                        {/**howtodo */}
                        <div className="w-[500px] mb-4">
                            <label htmlFor="howToDo" className='block text-gray-700 front-bold mb-2'>
                                How to Do:
                            </label>
                            <textarea 
                                onChange={handleChange}
                                name="howToDo"
                                rows="9"
                                className="w-full border-gray-300 
                                border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                                placeholder={workoutData.howToDo}>
                            </textarea>
                        </div>
                        
                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" className="bg-[#f2e48d] justify-center hover:bg-secondary text-black font-bold py-2 px-4 
                    rounded focus:outline-none focus:shadow-outline">
                        Submit Details
                    </button>
                </div>
                <br/>
            </form>
            <div className="text-center">
                <Link to="/dashboard/manageWorkouts">
                    <button className="bg-red-300 justify-center hover:bg-red-500 text-black font-bold py-2 px-4 
                      rounded focus:outline-none focus:shadow-outline">
                        Cancle
                    </button>
                </Link>
            </div>

        </div>
    </div>
  )
}

export default UpdateW