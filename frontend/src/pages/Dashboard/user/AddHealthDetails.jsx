import { useForm } from "react-hook-form"
import { FaWeight } from "react-icons/fa";
import { GiBodyHeight, GiHeartBeats, GiSleepingBag } from "react-icons/gi";
import { MdBloodtype, MdOutlineHealthAndSafety } from "react-icons/md";
import { CgSmileNone } from "react-icons/cg";
import {Link, useNavigate} from "react-router-dom"
import { useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddHealthDetails = () => {
    const { currentUser} = useUser();
    const [formData, setFormData] = useState({
        fitnessGoals: []
    });
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prevState => {
                if (checked) {
                    return {
                        ...prevState,
                        fitnessGoals: [...prevState.fitnessGoals, value]
                    };
                } else {
                    return {
                        ...prevState,
                        fitnessGoals: prevState.fitnessGoals.filter(goal => goal !== value)
                    };
                }
            });
        } else {
            setFormData({
            ...formData,
            [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedFormData = {
            ...formData,
            email: currentUser.email,
            weight: parseInt(formData.weight, 10),
            height: parseInt(formData.height, 10),
            averageHeartRate: parseInt(formData.averageHeartRate, 10),
            bloodPressure: parseInt(formData.bloodPressure, 10),
            sleepHours: parseInt(formData.sleepHours, 10),
            stressScale: parseInt(formData.stressScale, 10)
          };
    axiosSecure
        .get(`http://localhost:5000/userHR/${currentUser.email}`)
        .then((res) => {
            console.log(res.data)
            if(res.data.count===0){
                axiosSecure.post('http://localhost:5000/userHR', updatedFormData)
                .then((res) => {
                    Swal.fire({
                    title: 'Success!',
                    text: 'Your details have been updated.',
                    icon: 'success',
                    });
                    navigate('/dashboard/userP');
                })
                .catch((error) => {
                    console.log(error);
                    Swal.fire({
                    title: 'Error!',
                    text: 'There was an error Adding health details.',
                    icon: 'error',
                    });
                });
            }else{
                Swal.fire({
                    title: '',
                    text: 'Already Submitted!!',
                    icon: 'warning',
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
    <div className='w-[1100px] h-screen justify-top items-center bg-white dark:bg-black'>
        <div className="bg-white p-8 rounded-lg ">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-5 md:grid-cols-4 lg:grid-cols-4">
                    <div className="mb-4">
                        <label htmlFor="weight" className='block text-gray-700 front-bold mb-2'>
                            <FaWeight className="inline-block br-2 mb-1 text-lg"/>   Weight
                        </label>
                        <input 
                        type='number' 
                        name="weight"
                        placeholder="Enter your Weight" 
                        onChange={handleChange}
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="height" className='block text-gray-700 front-bold mb-2'>
                            <GiBodyHeight className="inline-block br-2 mb-1 text-lg"/>   Height
                        </label>
                        <input 
                        type='number' 
                        name="height"
                        placeholder="Enter your Height" 
                        onChange={handleChange}
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="averageHeartRate" className='block text-gray-700 front-bold mb-2'>
                            <GiHeartBeats  className="inline-block br-2 mb-1 text-lg"/>   Average Heart Rate
                        </label>
                        <input 
                        type='number' 
                        name="averageHeartRate"
                        placeholder="Enter your Average Heart Rate" 
                        onChange={handleChange}
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                    </div>
                    <div className="mb-4">
                          <label htmlFor="bloodPressure" className='block text-gray-700 front-bold mb-2'>
                              <MdBloodtype  className="inline-block br-2 mb-1 text-lg"/>   Average Bood Pressure
                          </label>
                          <input 
                          type='number' 
                          name="bloodPressure"
                          placeholder="Enter your Average Bood Pressure" 
                          onChange={handleChange}
                          className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                          focus:border-blue-300"/>
                    </div>
                </div> 
                <div className="flex items-center gap-5 md:grid-cols-3 lg:grid-cols-3">
                    <div className="mb-4">
                        <label htmlFor="sleepHours" className='block text-gray-700 front-bold mb-2'>
                            <GiSleepingBag className="inline-block br-2 mb-1 text-lg"/>   Sleeping Hours
                        </label>
                        <input 
                        type='number' 
                        name="sleepHours"
                        onChange={handleChange}
                        placeholder="Enter your Sleeping Hours" 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="stressScale" className='block text-gray-700 front-bold mb-2'>
                            <CgSmileNone className="inline-block br-2 mb-1 text-lg"/>   How Stressed are you in a scale of 0 to 5?
                        </label>
                        <select 
                        onChange={handleChange} 
                        name="stressScale"
                        className="w-full border-gray-300 
                        border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300">
                            <option value="">Select</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="currentLevelofPhysicalActivity" className='block text-gray-700 front-bold mb-2'>
                            <MdOutlineHealthAndSafety className="inline-block br-2 mb-1 text-lg"/>   What is your current level of physical activity?
                        </label>
                        <select 
                        onChange={handleChange} 
                        name="currentLevelofPhysicalActivity"
                        className="w-full border-gray-300 
                        border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300">
                            <option value="">Select</option>
                            <option value="sedentary">sedentary</option>
                            <option value="light">light</option>
                            <option value="moderate">moderate</option>
                            <option value="heavy">heavy</option>
                        </select>
                    </div>
                </div>
                <div className="flex items-center gap-5 md:grid-cols-4 lg:grid-cols-4">
                    <div className="w-full mb-4">
                        <label htmlFor="existingMedicalCondition" className='block text-gray-700 front-bold mb-2'>
                            <MdOutlineHealthAndSafety className="inline-block br-2 mb-1 text-lg"/>   Do you have any existing medical conditions?
                        </label>
                        <textarea 
                            onChange={handleChange}
                            rows="2"
                            name="existingMedicalCondition"
                            className="w-full border-gray-300 
                            border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="">
                        </textarea>
                    </div>
                    <div className="w-full mb-4">
                        <label htmlFor="anySurgeries" className='block text-gray-700 front-bold mb-2'>
                            <MdOutlineHealthAndSafety className="inline-block br-2 mb-1 text-lg"/>   Have you had any surgeries or medical procedures in the past year?
                        </label>
                        <textarea 
                            onChange={handleChange}
                            name="anySurgeries"
                            rows="2"
                            className="w-full border-gray-300 
                            border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="">
                        </textarea>
                    </div>
                </div>
                <div className="flex items-center gap-5 md:grid-cols-4 lg:grid-cols-4">
                    <div className="w-1/2 mb-4">
                        <label htmlFor="AnyAllergies" className='block text-gray-700 front-bold mb-2'>
                            <MdOutlineHealthAndSafety className="inline-block br-2 mb-1 text-lg"/>   Do you have any food allergies?
                        </label>
                        <textarea 
                            onChange={handleChange}
                            name="AnyAllergies"
                            rows="2"
                            className="w-full border-gray-300 
                            border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="">
                        </textarea>
                    </div>
                </div>
                <div className="flex items-center gap-5 md:grid-cols-4 lg:grid-cols-4">
                    <div className="w-full mb-4">
                        <label htmlFor="fitnessGoals" className='block text-gray-700 front-bold mb-2'>
                            <MdOutlineHealthAndSafety className="inline-block br-2 mb-1 text-lg"/>   Is there any fitness goal that you would like to achieve?
                        </label>
                        <div className="flex items-center gap-2 md:grid-cols-4 lg:grid-cols-4">
                                <div>
                                    <input type="checkbox" name="fitnessGoals" onChange={handleChange} value="Brain Health"/> Brain Health<br/>
                                    <input type="checkbox" name="fitnessGoals" onChange={handleChange} value="Longevity"/> Longevity<br/>
                                    <input type="checkbox" name="fitnessGoals" onChange={handleChange} value="Diabetes Management"/> Diabetes Management<br/>
                                    <input type="checkbox" name="fitnessGoals" onChange={handleChange} value="Heart Health"/> Heart Health
                                </div>
                                <div>
                                    <input  type="checkbox" name="forGoal" onChange={handleChange} value="Weight Loss"/> Weight Loss<br/>
                                    <input  type="checkbox" name="forGoal" onChange={handleChange} value="General fitness"/> General fitness<br/>
                                    <input  type="checkbox" name="forGoal" onChange={handleChange} value="Overall Health"/> Overall Health<br/>
                                    <input  type="checkbox" name="forGoal" onChange={handleChange} value="Muscle Toning"/> Muscle Toning<br/>
                                    <input  type="checkbox" name="forGoal" onChange={handleChange} value="Cardiovascular Health"/> Cardiovascular Health<br/>
                                </div>
                                <div>
                                    <input type="checkbox" name="forGoal" onChange={handleChange} value="Improve Endurance"/> Improve Endurance<br/>
                                    <input type="checkbox" name="forGoal" onChange={handleChange} value="Muscle Building"/> Muscle Building<br/>
                                    <input type="checkbox" name="forGoal" onChange={handleChange} value="Improve Strength"/> Improve Strength<br/>
                                    <input type="checkbox" name="forGoal" onChange={handleChange} value="Flexibility"/> Flexibility<br/>
                                    <input type="checkbox" name="forGoal" onChange={handleChange} value="Stress Reduction"/> Stress Reduction<br/>
                                </div>
                                <div>
                                    <input type="checkbox" name="forGoal" onChange={handleChange} value="Injury Prevention"/> Injury Prevention<br/>
                                    <input type="checkbox" name="forGoal" onChange={handleChange} value="Athletic performance"/> Athletic performance<br/>
                                    <input type="checkbox" name="forGoal" onChange={handleChange} value="Improve Speed"/> Improve Speed<br/>
                                    <input type="checkbox" name="forGoal" onChange={handleChange} value="Improve Speed"/> Improve Core strength<br/>
                                    <input type="checkbox" name="forGoal" onChange={handleChange} value="Improve Speed"/> Improve Stability
                                </div>
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
                <Link to="/dashboard/userP">
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

export default AddHealthDetails