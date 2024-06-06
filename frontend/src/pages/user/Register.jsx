import { useForm } from "react-hook-form"
import { AiOutlineLock, AiOutlineMail, AiOutlinePhone, AiOutlinePicture, AiOutlineUser } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import {Link, useNavigate} from "react-router-dom"
import GoogleLogin from "../../components/Social/GoogleLogin"
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../utilities/providers/AuthProvider";

const Register = () => {
    const navigate = useNavigate();
    const {signUp,updateUser,setError} = useContext(AuthContext);
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
                        const updatedFormData = {
                            ...formData,
                            age: parseInt(formData.age, 10)
                          };
                        return axios.post('http://localhost:5000/new-user',updatedFormData).then(()=>{
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
    const password = watch('password','')
  return (
    <div className='flex justify-center items-center pt-14 bg-gray-100 dark:bg-black'>
        <div className="bg-gray-200 p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center mb-6 text-secondary">Please Register</h2>

            {/*form data*/}
            <form onSubmit={handleSubmit(onSubmit)}>

                {/*Full name and email */}
                <div className="flex items-center gap-5">
                    {/*name*/}
                    <div className="mb-4">
                        <label htmlFor="name" className='block text-gray-700 front-bold mb-2'>
                            <AiOutlineUser className="inline-block br-2 mb-1 text-lg"/>   Full Name
                        </label>
                        <input type='text' placeholder="Enter your Full Name" {...register("fullName",{required:true})} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                    </div>
                    {/*email*/}
                    <div className="mb-4">
                        <label htmlFor="email" className='block text-gray-700 front-bold mb-2'>
                            <AiOutlineMail className="inline-block br-2 mb-1 text-lg"/>   Email
                        </label>
                        <input type='text' placeholder="Enter your Email" {...register("email",{required:true})} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                    </div>
                </div>

                {/**passwords */}
                <div className="flex items-center gap-5">
                    {/*password*/}
                    <div className="mb-4">
                        <label htmlFor="password" className='block text-gray-700 front-bold mb-2'>
                            <AiOutlineLock className="inline-block br-2 mb-1 text-lg"/>   Password
                        </label>
                        <input type='password' placeholder="Enter a Password" {...register("password",{required:true})} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                    </div>
                    {/*confirm password*/}
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className='block text-gray-700 front-bold mb-2'>
                            <AiOutlineLock className="inline-block br-2 mb-1 text-lg"/>   Confirm Password
                        </label>
                        <input type='password' placeholder="Enter the Password Again" {...register("confirmPassword",{required:true,
                        validate:(value)=> value === password || "PassWord Does not match!"})} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                    </div>
                </div>

                {/**username and age */}
                <div className="flex items-center gap-5">
                    {/**username */}
                    <div className="w-full mb-4">
                        <label htmlFor="userName" className='block text-gray-700 front-bold mb-2'>
                            <AiOutlineUser className="inline-block br-2 mb-1 text-lg"/>   Username
                        </label>
                        <input type='text' placeholder="Enter Username" {...register("userName",{required:true})} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                    </div>
                    {/*age */}
                    <div className="w-full mb-4">
                        <label htmlFor="age" className='block text-gray-700 front-bold mb-2'>
                            <AiOutlineUser className="inline-block br-2 mb-1 text-lg"/>   Age
                        </label>
                        <input type='number' placeholder="Enter your age" {...register("age",{required:true})} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                    </div>
                </div>

                {/**phone number and photo*/}
                <div className="flex items-center gap-5">
                    <div className="w-full mb-4">
                        <label htmlFor="phoneNo" className='block text-gray-700 front-bold mb-2'>
                            <AiOutlinePhone className="inline-block br-2 mb-1 text-lg"/>   Phone Number
                        </label>
                        <input type='tel' placeholder="Enter your Phone Number" {...register("phoneNo",{required:true})} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                    </div>
                    <div className="w-full mb-4">
                        <label htmlFor="photoUrl" className='block text-gray-700 front-bold mb-2'>
                            <AiOutlinePicture className="inline-block br-2 mb-1 text-lg"/>   Photo URL
                        </label>
                        <input type='text' placeholder="Photo URL" {...register("photoUrl")} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                    </div>
                </div>

                {/**gender */}
                <div className="flex items-center gap-5">
                    <div className="w-full mb-4">
                        <label htmlFor="gender" className='block text-gray-700 front-bold mb-2'>
                            <AiOutlineUser className="inline-block br-2 mb-1 text-lg"/>   Gender
                        </label>
                        <select {...register("gender",{required:true})} className="w-full border-gray-300 
                        border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300">
                            <option value="">Select Gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                        </select>
                    </div>
                </div>

                {/**Employment status */}
                <div className="flex items-center gap-5">
                    <div className="w-full mb-4">
                        <label htmlFor="employmentStatus" className='block text-gray-700 front-bold mb-2'>
                            <AiOutlineUser className="inline-block br-2 mb-1 text-lg"/>   Employment Status
                        </label>
                        <select {...register("employmentStatus")} className="w-full border-gray-300 
                        border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300">
                            <option value="">Select Status</option>
                            <option value="undergraduate">Undergraduate</option>
                            <option value="school">School</option>
                            <option value="working">Working</option>
                            <option value="unemployed">Un-Employed</option>
                        </select>
                    </div>
                </div>

                {/**address */}
                <div className="flex items-center gap-5">
                    <div className="w-full mb-4">
                        <label htmlFor="address" className='block text-gray-700 front-bold mb-2'>
                            <FiMapPin className="inline-block br-2 mb-1 text-lg"/>   Address
                        </label>
                        <textarea 
                            {...register("address",{required:true})}
                            rows="3"
                            className="w-full border-gray-300 
                            border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter address">
                            
                        </textarea>
                    </div>
                </div>

                {/**button */}
                <div className="text-center">
                    <button type="submit" className="bg-secondary hover:bg-red-500 text-white py-2 px-4 
                    rounded-md">
                        Register
                    </button>
                    {/*
                        errors && (<div className="text-red-500 text-sm w-full mt-1">
                            <p>Password doesn't match! </p>
                        </div>)*/
                    }
                </div>

            </form>

            <p className="text-center mt-4">
                Already have an account? <Link to ="/login" className="underline text-secondary ml-1">Login</Link>
            </p>
            <GoogleLogin/>
        </div>
    </div>
    
  )
}

export default Register