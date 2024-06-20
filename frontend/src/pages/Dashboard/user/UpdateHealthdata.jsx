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
        weight: '',
        height: '',
        averageHeartRate: '',
        bloodPressure: '',
        existingMedicalCondition: '',
        anySurgeries: '',
        currentLevelofPhysicalActivity: '',
        fitnessGoals: '',
        AnyAllergies: '',
        stressScale: '',
        sleepHours: '',
    });
    const [formData, setFormData] = useState({});
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (currentUser?.email) {
            axiosSecure.get(`http://localhost:5000/userHR/${currentUser.email}`)
                .then((res) => {
                    setHealthData({
                        weight: res.data.weight,
                        height: res.data.height,
                        averageHeartRate: res.data.averageHeartRate,
                        bloodPressure: res.data.bloodPressure,
                        existingMedicalCondition: res.data.existingMedicalCondition,
                        anySurgeries: res.data.anySurgeries,
                        currentLevelofPhysicalActivity: res.data.currentLevelofPhysicalActivity,
                        fitnessGoals: res.data.fitnessGoals,
                        AnyAllergies: res.data.AnyAllergies,
                        stressScale: res.data.stressScale,
                        sleepHours: res.data.sleepHours,
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
        const updatedFormData = {
            ...formData,
            weight: parseInt(formData.weight, 10),
            height: parseInt(formData.height, 10),
            averageHeartRate: parseInt(formData.averageHeartRate, 10),
            bloodPressure: parseInt(formData.bloodPressure, 10),
            sleepHours: parseInt(formData.sleepHours, 10),
            stressScale: parseInt(formData.stressScale, 10)
          };
        e.preventDefault();
        axiosSecure.patch(`http://localhost:5000/userHR/${currentUser.email}`, updatedFormData)
            .then((res) => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Your details have been updated.',
                    icon: 'success',
                });
                refetch();
                navigate('/dashboard/userP');
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error updating your details.',
                    icon: 'error',
                });
            });
    };

    return (
        <div className='w-[1100px] justify-center items-center bg-white dark:bg-black'>
            <div className="bg-white p-8 rounded-lg ">
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
                            <textarea
                                name="existingMedicalCondition"
                                placeholder={healthData.existingMedicalCondition}
                                onChange={handleChange}
                                rows="2"
                                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                            ></textarea>
                        </div>
                        <div className="w-full mb-4">
                            <label htmlFor="anySurgeries" className='block text-gray-700 front-bold mb-2'>
                                <MdOutlineHealthAndSafety className="inline-block br-2 mb-1 text-lg"/> Surgeries or Medical Procedures in the Past Year
                            </label>
                            <textarea
                                name="anySurgeries"
                                placeholder={healthData.anySurgeries}
                                onChange={handleChange}
                                rows="2"
                                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                            ></textarea>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 md:grid-cols-4 lg:grid-cols-4">
                        <div className="w-full mb-4">
                            <label htmlFor="AnyAllergies" className='block text-gray-700 front-bold mb-2'>
                                <MdOutlineHealthAndSafety className="inline-block br-2 mb-1 text-lg"/> Food Allergies
                            </label>
                            <textarea
                                name="AnyAllergies"
                                placeholder={healthData.AnyAllergies}
                                onChange={handleChange}
                                rows="2"
                                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                            ></textarea>
                        </div>
                        <div className="w-full mb-4">
                            <label htmlFor="fitnessGoals" className='block text-gray-700 front-bold mb-2'>
                                <MdOutlineHealthAndSafety className="inline-block br-2 mb-1 text-lg"/> Fitness Goals or Lifestyle
                            </label>
                            <textarea
                                name="fitnessGoals"
                                placeholder={healthData.fitnessGoals}
                                onChange={handleChange}
                                rows="2"
                                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                            ></textarea>
                        </div>
                    </div>
                    <div className="text-center">
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
