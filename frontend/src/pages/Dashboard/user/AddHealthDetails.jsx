import { useForm } from "react-hook-form"
import { FiMapPin } from "react-icons/fi";
import { FaWeight } from "react-icons/fa";
import { GiBodyHeight, GiHeartBeats, GiSleepingBag } from "react-icons/gi";
import { MdBloodtype, MdOutlineHealthAndSafety } from "react-icons/md";
import { CgSmileNone } from "react-icons/cg";
import { AiOutlineLock, AiOutlineMail, AiOutlinePhone, AiOutlinePicture, AiOutlineUser } from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom"
import { useContext } from "react";
import axios from "axios";

const AddHealthDetails = () => {
  const {
      register, 
      handleSubmit,
      watch,
      formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    //setError('');
    signUp(data.email, data.password).then((result)=>{
        const user = result.user;
        updateUser(data.fullName,data.photoUrl)
            .then(()=>{
                const userImp = {
                    fullName:user?.displayName,
                    gender:data.gender,
                    email: user?.email,
                    phoneNo: data.phoneNo,
                    age: data.age,
                    address: data.address,
                    userName: data.userName,
                    password: data.password,
                    role:"user",
                    photoUrl: data.photoUrl,
                    employmentStatus: data.employmentStatus
                }
                if(user.email && user.displayName){
                    return axios.post('http://localhost:5000/new-user',userImp).then(()=>{
                        setError("");
                        navigate('/');
                        return "Registration Successful"
                    }).catch((err)=>{
                      console.log(err.message)
                      throw new Error(err)
                    })
                  }
            })
            .catch((err)=>{
                setError(err);
                console.log(err.message)
            })
        
    })
  }

  return (
    <div className='justify-center items-center bg-white dark:bg-black'>
        <div className="bg-white p-8 rounded-lg ">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center gap-5 md:grid-cols-4 lg:grid-cols-4">
                    <div className="mb-4">
                        <label htmlFor="weight" className='block text-gray-700 front-bold mb-2'>
                            <FaWeight className="inline-block br-2 mb-1 text-lg"/>   Weight
                        </label>
                        <input type='number' placeholder="Enter your Weight" {...register("weight",{required:true})} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="height" className='block text-gray-700 front-bold mb-2'>
                            <GiBodyHeight className="inline-block br-2 mb-1 text-lg"/>   Height
                        </label>
                        <input type='number' placeholder="Enter your Height" {...register("height",{required:true})} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="averageHeartRate" className='block text-gray-700 front-bold mb-2'>
                            <GiHeartBeats  className="inline-block br-2 mb-1 text-lg"/>   Average Heart Rate
                        </label>
                        <input type='number' placeholder="Enter your Average Heart Rate" {...register("averageHeartRate",{required:true})} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                    </div>
                    <div className="mb-4">
                          <label htmlFor="bloodPressure" className='block text-gray-700 front-bold mb-2'>
                              <MdBloodtype  className="inline-block br-2 mb-1 text-lg"/>   Average Bood Pressure
                          </label>
                          <input type='number' placeholder="Enter your Average Bood Pressure" {...register("bloodPressure",{required:true})} 
                          className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                          focus:border-blue-300"/>
                    </div>
                </div> 
                <div className="flex items-center gap-5 md:grid-cols-3 lg:grid-cols-3">
                    <div className="mb-4">
                        <label htmlFor="sleepHours" className='block text-gray-700 front-bold mb-2'>
                            <GiSleepingBag className="inline-block br-2 mb-1 text-lg"/>   Sleeping Hours
                        </label>
                        <input type='number' placeholder="Enter your Sleeping Hours" {...register("sleepHours",{required:true})} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="stressScale" className='block text-gray-700 front-bold mb-2'>
                            <CgSmileNone className="inline-block br-2 mb-1 text-lg"/>   How Stressed are you in a scale of 0 to 5?
                        </label>
                        <select {...register("stressScale",{required:true})} className="w-full border-gray-300 
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
                        <label htmlFor="stressScale" className='block text-gray-700 front-bold mb-2'>
                            <MdOutlineHealthAndSafety className="inline-block br-2 mb-1 text-lg"/>   What is your current level of physical activity?
                        </label>
                        <select {...register("stressScale",{required:true})} className="w-full border-gray-300 
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
                            {...register("existingMedicalCondition",{required:true})}
                            rows="2"
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
                            {...register("anySurgeries",{required:true})}
                            rows="2"
                            className="w-full border-gray-300 
                            border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="">
                        </textarea>
                    </div>
                </div>
                <div className="flex items-center gap-5 md:grid-cols-4 lg:grid-cols-4">
                    <div className="w-full mb-4">
                        <label htmlFor="AnyAllergies" className='block text-gray-700 front-bold mb-2'>
                            <MdOutlineHealthAndSafety className="inline-block br-2 mb-1 text-lg"/>   Do you have any food allergies?
                        </label>
                        <textarea 
                            {...register("AnyAllergies",{required:true})}
                            rows="2"
                            className="w-full border-gray-300 
                            border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="">
                        </textarea>
                    </div>
                    <div className="w-full mb-4">
                        <label htmlFor="fitnessGoals" className='block text-gray-700 front-bold mb-2'>
                            <MdOutlineHealthAndSafety className="inline-block br-2 mb-1 text-lg"/>   Is there anything else you would like us to know about your health, fitness goals, or lifestyle?
                        </label>
                        <textarea 
                            {...register("fitnessGoals",{required:true})}
                            rows="2"
                            className="w-full border-gray-300 
                            border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="">
                        </textarea>
                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" className="bg-[#f2e48d] justify-center hover:bg-secondary text-black font-bold py-2 px-4 
                    rounded focus:outline-none focus:shadow-outline">
                        Add Details
                    </button>
                </div>
                <br/>
                <div className="text-center">
                    <button type="cancle" className="bg-red-300 justify-center hover:bg-red-500 text-black font-bold py-2 px-4 
                      rounded focus:outline-none focus:shadow-outline">
                        Cancle
                    </button>
                </div>

            </form>

        </div>
    </div>
    
  )
}

export default AddHealthDetails