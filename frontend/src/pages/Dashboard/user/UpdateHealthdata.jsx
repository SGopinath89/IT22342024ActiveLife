import React, { useState, useEffect } from 'react';
import useUser from '../../../hooks/useUser';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaWeight } from "react-icons/fa";
import { GiBodyHeight, GiHeartBeats, GiSleepingBag } from "react-icons/gi";
import { MdBloodtype, MdOutlineHealthAndSafety } from "react-icons/md";
import { CgSmileNone } from "react-icons/cg";

const UpdateHealthdata = () => {
    const { currentUser, refetch } = useUser();
    const [healthData, setHealthData] = useState({
        fitnessGoals: []
    });
    const [formData, setFormData] = useState({
        weight: healthData.weight,
        height: healthData.height,
        averageHeartRate: healthData.averageHeartRate,
        bloodPressure: healthData.bloodPressure,
        existingMedicalCondition: healthData.existingMedicalCondition,
        anySurgeries: healthData.anySurgeries,
        currentLevelofPhysicalActivity: healthData.currentLevelofPhysicalActivity,
        AnyAllergies: healthData.AnyAllergies,
        stressScale: healthData.stressScale,
        sleepHours: healthData.sleepHours,
        fitnessGoals: healthData.fitnessGoals
    });
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser?.email) {
            axiosSecure.get(`http://localhost:5000/userHR/${currentUser.email}`)
                .then((res) => {
                    const data = res.data.documents[0];
                    setHealthData({
                        weight: data.weight,
                        height: data.height,
                        averageHeartRate: data.averageHeartRate,
                        bloodPressure: data.bloodPressure,
                        existingMedicalCondition: data.existingMedicalCondition,
                        anySurgeries: data.anySurgeries,
                        currentLevelofPhysicalActivity: data.currentLevelofPhysicalActivity,
                        AnyAllergies: data.AnyAllergies,
                        stressScale: data.stressScale,
                        sleepHours: data.sleepHours,
                        fitnessGoals: data.fitnessGoals || []
                    });
                    const fitnessGoals = data.fitnessGoals
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [axiosSecure, currentUser?.email]);

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
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Log the form data before sending the request
        console.log('Form Data:', formData);

        axiosSecure.patch(`http://localhost:5000/userHR/${currentUser.email}`, formData)
            .then((res) => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Your Health details have been updated.',
                    icon: 'success',
                    timer: 1500
                });
                navigate('/dashboard/userP');
            })
            .catch((error) => {
                console.error('Error:', error.response ? error.response.data : error.message);
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error updating your details.',
                    icon: 'error',
                    timer: 1500
                });
            });
    };

    

    return (
        <div className='w-screen h-screen justify-top items-center'>
            <div className="bg-white p-8 w-[1000px] rounded-lg ">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center gap-5 md:grid-cols-4 lg:grid-cols-4">
                        <div className="mb-4">
                            <label htmlFor="weight" className='block text-gray-700 front-bold mb-2'>
                                <FaWeight className="inline-block br-2 mb-1 text-lg"/> Weight
                            </label>
                            <input
                                type='number'
                                name="weight"
                                placeholder={healthData.weight}
                                onChange={handleChange}
                                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="height" className='block text-gray-700 front-bold mb-2'>
                                <GiBodyHeight className="inline-block br-2 mb-1 text-lg"/> Height
                            </label>
                            <input
                                type='number'
                                name="height"
                                placeholder={healthData.height}
                                onChange={handleChange}
                                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="averageHeartRate" className='block text-gray-700 front-bold mb-2'>
                                <GiHeartBeats className="inline-block br-2 mb-1 text-lg"/> Average Heart Rate
                            </label>
                            <input
                                type='number'
                                name="averageHeartRate"
                                placeholder={healthData.averageHeartRate}
                                onChange={handleChange}
                                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="bloodPressure" className='block text-gray-700 front-bold mb-2'>
                                <MdBloodtype className="inline-block br-2 mb-1 text-lg"/> Average Blood Pressure
                            </label>
                            <input
                                type='number'
                                name="bloodPressure"
                                placeholder={healthData.bloodPressure}
                                onChange={handleChange}
                                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-5 md:grid-cols-3 lg:grid-cols-3">
                        <div className="mb-4">
                            <label htmlFor="sleepHours" className='block text-gray-700 front-bold mb-2'>
                                <GiSleepingBag className="inline-block br-2 mb-1 text-lg"/> Sleeping Hours
                            </label>
                            <input
                                type='number'
                                name="sleepHours"
                                placeholder={healthData.sleepHours}
                                onChange={handleChange}
                                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="stressScale" className='block text-gray-700 front-bold mb-2'>
                                <CgSmileNone className="inline-block br-2 mb-1 text-lg"/> How Stressed are you in a scale of 0 to 5?
                            </label>
                            <select
                                name="stressScale"
                                placeholder={healthData.stressScale}
                                onChange={handleChange}
                                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                            >
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
                                <MdOutlineHealthAndSafety className="inline-block br-2 mb-1 text-lg"/> Current Level of Physical Activity
                            </label>
                            <select
                                name="currentLevelofPhysicalActivity"
                                placeholder={healthData.currentLevelofPhysicalActivity}
                                onChange={handleChange}
                                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                            >
                                <option value="">Select</option>
                                <option value="sedentary">Sedentary</option>
                                <option value="light">Light</option>
                                <option value="moderate">Moderate</option>
                                <option value="heavy">Heavy</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 md:grid-cols-4 lg:grid-cols-4">
                        <div className="w-full mb-4">
                            <label htmlFor="existingMedicalCondition" className='block text-gray-700 front-bold mb-2'>
                                <MdOutlineHealthAndSafety className="inline-block br-2 mb-1 text-lg"/> Existing Medical Conditions
                            </label>                       
                            <input 
                                type='text' 
                                name="existingMedicalCondition"
                                placeholder={healthData.existingMedicalCondition}
                                onChange={handleChange}
                                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                                focus:border-blue-300"/>
                        </div>
                        <div className="w-full mb-4">
                            <label htmlFor="anySurgeries" className='block text-gray-700 front-bold mb-2'>
                                <MdOutlineHealthAndSafety className="inline-block br-2 mb-1 text-lg"/> Surgeries or Medical Procedures in the Past Year
                            </label>
                            <input 
                                type='text' 
                                name="anySurgeries"
                                placeholder={healthData.anySurgeries}
                                onChange={handleChange}
                                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                                focus:border-blue-300"/>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 md:grid-cols-4 lg:grid-cols-4">
                        <div className="w-full mb-4">
                            <label htmlFor="AnyAllergies" className='block text-gray-700 front-bold mb-2'>
                                <MdOutlineHealthAndSafety className="inline-block br-2 mb-1 text-lg"/> Food Allergies
                            </label>
                            <input 
                                type='text' 
                                name="AnyAllergies"
                                placeholder={healthData.AnyAllergies}
                                onChange={handleChange}
                                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                                focus:border-blue-300"/>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 md:grid-cols-4 lg:grid-cols-4">
                        <div className="w-full mb-4">
                            <label htmlFor="fitnessGoals" className='block text-gray-700 front-bold mb-2'>
                                <MdOutlineHealthAndSafety className="inline-block br-2 mb-1 text-lg"/>   
                                Is there any fitness goal that you would like to achieve?<br/>
                                <span className=' text-sm text-gray-500'>*Please select all the goals you need including the previosly selected</span>
                            </label>
                            <div className="flex items-center gap-2 md:grid-cols-4 lg:grid-cols-4">
                                    <div>
                                        <span className=' text-sm text-gray-500'>**For Diets</span><br/>
                                        <input type="checkbox" name="fitnessGoals" onChange={handleChange} value="Brain Health"/> Brain Health<br/>
                                        <input type="checkbox" name="fitnessGoals" onChange={handleChange} value="Longevity"/> Longevity<br/>
                                        <input type="checkbox" name="fitnessGoals" onChange={handleChange} value="Diabetes Management"/> Diabetes Management<br/>
                                        <input type="checkbox" name="fitnessGoals" onChange={handleChange} value="Heart Health"/> Heart Health
                                        <br/> <br/>
                                    </div>
                                    <div>
                                        <span className=' text-sm text-gray-500'>**For Diets & Workouts</span><br/>
                                        <input  type="checkbox" name="fitnessGoals" onChange={handleChange} value="Weight Loss"/> Weight Loss<br/>
                                        <input  type="checkbox" name="fitnessGoals" onChange={handleChange} value="General fitness"/> General fitness<br/>
                                        <input  type="checkbox" name="fitnessGoals" onChange={handleChange} value="Overall Health"/> Overall Health<br/>
                                        <input type="checkbox" name="fitnessGoals" onChange={handleChange} value="Stress Reduction"/> Stress Reduction<br/>
                                        <input type="checkbox" name="fitnessGoals" onChange={handleChange} value="Improve Endurance"/> Improve Endurance<br/>
                                    </div>
                                    <div>
                                        <span className=' text-sm text-gray-500'>**For Workouts</span><br/>
                                        <input type="checkbox" name="fitnessGoals" onChange={handleChange} value="Muscle Building"/> Muscle Building<br/>
                                        <input type="checkbox" name="fitnessGoals" onChange={handleChange} value="Improve Strength"/> Improve Strength<br/>
                                        <input type="checkbox" name="fitnessGoals" onChange={handleChange} value="Flexibility"/> Flexibility<br/>
                                        <input  type="checkbox" name="fitnessGoals" onChange={handleChange} value="Muscle Toning"/> Muscle Toning<br/>
                                        <input  type="checkbox" name="fitnessGoals" onChange={handleChange} value="Cardiovascular Health"/> Cardiovascular Health<br/>
                                    </div>
                                    <div>
                                        <br/>
                                        <input type="checkbox" name="fitnessGoals" onChange={handleChange} value="Injury Prevention"/> Injury Prevention<br/>
                                        <input type="checkbox" name="fitnessGoals" onChange={handleChange} value="Athletic performance"/> Athletic performance<br/>
                                        <input type="checkbox" name="fitnessGoals" onChange={handleChange} value="Improve Speed"/> Improve Speed<br/>
                                        <input type="checkbox" name="fitnessGoals" onChange={handleChange} value="Improve Core strength"/> Improve Core strength<br/>
                                        <input type="checkbox" name="fitnessGoals" onChange={handleChange} value="Improve Stability"/> Improve Stability
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                    <span className=' text-sm text-red-400'>**Please remember to select all the your previous goals before submitting**</span><br/>
                        <button type="submit" className="bg-[#f2e48d] justify-center hover:bg-secondary text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Submit Details
                        </button>
                    </div>
                    <br/>
                </form>
                <div className="text-center">
                    <Link to="/dashboard/userP">
                        <button className="bg-red-300 justify-center hover:bg-red-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Cancel
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UpdateHealthdata;
