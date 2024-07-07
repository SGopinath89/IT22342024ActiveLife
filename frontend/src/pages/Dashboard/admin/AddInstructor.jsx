import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { useState } from "react";
import Swal from 'sweetalert2'

const AddInstructor = () => {
    const [formData, setFormData] = useState({
        specialities:[]
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
                        specialities: [...prevState.specialities, value]
                    };
                } else {
                    return {
                        ...prevState,
                        specialities: prevState.specialities.filter(speciality => speciality !== value)
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
            axiosSecure.post('http://localhost:5000/instructor', formData)
                .then((res) => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Successfully Added a Instructor.',
                        icon: 'success',
                        timer: 1500
                    });
                    navigate('/dashboard/manageInstructors');
                })
                .catch((error) => {
                    console.log(error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'There was an error adding a Instructor.',
                        icon: 'error',
                        timer: 1500
                    });
                });
    };

  return (   
     <div className='w-screen h-screen justify-top items-center'>
        <div className="bg-white p-8 w-[1000px] rounded-lg ">
        <h2 className="text-3xl font-bold text-center mb-6 text-secondary">Add Doctor/Instructor<br/><span className=" text-red-600 text-sm">* Required</span></h2>
            <form onSubmit={handleSubmit} className="text-center">
                <div className="flex items-center gap-5 md:grid-cols-2 lg:grid-cols-2">
                    <div>
                        <div className="w-[300px] mb-4">
                            <label htmlFor="name" className='block text-gray-700 font-bold mb-2'>
                                Name
                                <span className=" text-red-600">*</span>
                            </label>
                            <input 
                            type='text' 
                            name="name"
                            placeholder="Enter the Name" 
                            onChange={handleChange}
                            className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                            focus:border-blue-300"/>
                        </div>
                        <div className="w-[300pxpx] mb-4">
                            <label htmlFor="email" className='block text-gray-700 font-bold mb-2'>
                                Email
                                <span className=" text-red-600">*</span>
                            </label>
                            <input 
                            type='text' 
                            name="email"
                            placeholder="Enter the Email" 
                            onChange={handleChange}
                            className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                            focus:border-blue-300"/>
                        </div>
                        <div className="w-[300pxpx] mb-4">
                            <label htmlFor="phoneNo" className='block text-gray-700 font-bold mb-2'>
                                Phone Number
                                <span className=" text-red-600">*</span>
                            </label>
                            <input 
                            type='text' 
                            name="phoneNo"
                            placeholder="Enter the Phone Number" 
                            onChange={handleChange}
                            className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                            focus:border-blue-300"/>
                        </div>
                    </div>
                    <div>
                        <div className="w-[500px] mb-4">
                            <label htmlFor="qualification" className='block text-gray-700 font-bold mb-2'>
                               Qualifications
                               <span className=" text-red-600">*</span>
                            </label>
                            <textarea 
                                onChange={handleChange}
                                rows=""
                                name="qualification"
                                className="w-full border-gray-300 
                                border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="">
                            </textarea>
                        </div>
                        <div className="w-[500px] mb-4">
                            <label htmlFor="experience" className='block text-gray-700 font-bold mb-2'>
                                Experiences
                                <span className=" text-red-600">*</span>
                            </label>
                            <textarea 
                                onChange={handleChange}
                                name="experience"
                                rows="2"
                                className="w-full border-gray-300 
                                border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="">
                            </textarea>
                        </div>
                    </div>
                </div>
                <div className="w-full mb-4">
                    <br/>
                    <label htmlFor="specialities" className='block text-center text-gray-700 font-bold mb-2'>
                        Specialities
                        <span className=" text-red-600">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        <div>
                            <span className=' text-base text-gray-500'>Diets</span><br/>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" name="specialities" onChange={handleChange} value="Plant-based and flexitarian diets" />
                                Plant-based and flexitarian diets
                            </label>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" name="specialities" onChange={handleChange} value="The MIND diet" />
                                The MIND diet
                            </label>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" name="specialities" onChange={handleChange} value="WW (formerly Weight Watchers)" />
                                WW (formerly Weight Watchers)
                            </label>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" name="specialities" onChange={handleChange} value="Intermittent fasting" />
                                Intermittent fasting
                            </label>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" name="specialities" onChange={handleChange} value="The Volumetrics diet" />
                                The Volumetrics diet
                            </label>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" name="specialities" onChange={handleChange} value="The Mayo Clinic Diet" />
                                The Mayo Clinic Diet
                            </label>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" name="specialities" onChange={handleChange} value="Low carb diets" />
                                Low carb diets
                            </label>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" name="specialities" onChange={handleChange} value="The Mediterranean diet" />
                                The Mediterranean diet
                            </label>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" name="specialities" onChange={handleChange} value="The DASH diet" />
                                The DASH diet
                            </label>
                        </div>
                        <div>
                            <span className=' text-base text-gray-500'>Workouts</span><br/>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" name="specialities" onChange={handleChange} value="Beginner's Full Body Workout" />
                                Beginner's Full Body Workout
                            </label>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" name="specialities" onChange={handleChange} value="HIIT Cardio Blast" />
                                HIIT Cardio Blast
                            </label>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" name="specialities" onChange={handleChange} value="Muscle Building Split Routine" />
                                Muscle Building Split Routine
                            </label>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" name="specialities" onChange={handleChange} value="Yoga and Mindfulness Journey" />
                                Yoga and Mindfulness Journey
                            </label>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" name="specialities" onChange={handleChange} value="Endurance Challenge" />
                                Endurance Challenge
                            </label>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" name="specialities" onChange={handleChange} value="Flexibility and Mobility Training" />
                                Flexibility and Mobility Training
                            </label>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" name="specialities" onChange={handleChange} value="Weight Loss Transformation" />
                                Weight Loss Transformation
                            </label>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" name="specialities" onChange={handleChange} value="Outdoor Fitness Adventure" />
                                Outdoor Fitness Adventure
                            </label>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" name="specialities" onChange={handleChange} value="Athlete's Performance Program" />
                                Athlete's Performance Program
                            </label>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" name="specialities" onChange={handleChange} value="Core Strength and Stability" />
                                Core Strength and Stability
                            </label>
                        </div>
                        <div>
                            <span className=' text-base text-gray-500'>Others</span><br/>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" name="specialities" onChange={handleChange} value="Allergy" />
                                Allergy
                            </label>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" name="specialities" onChange={handleChange} value="Surgery" />
                                Surgery
                            </label>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" name="specialities" onChange={handleChange} value="Medical Conditions" />
                                Medical Conditions
                            </label>
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
                <Link to="/dashboard/manageInstructors">
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

export default AddInstructor