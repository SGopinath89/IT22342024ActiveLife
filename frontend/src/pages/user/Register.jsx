import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AiOutlineLock, AiOutlineMail, AiOutlinePhone, AiOutlinePicture, AiOutlineUser } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import {Link, useNavigate} from "react-router-dom"
import GoogleLogin from "../../components/Social/GoogleLogin"
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../utilities/providers/AuthProvider";
import Swal from 'sweetalert2';
const schema = yup.object().shape({
    fullName: yup.string().required('Full Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: yup.string().required('Confirm Password is required'),
    userName: yup.string().required('Username is required'),
    age: yup.number().required('Age is required').min(0, 'Age must be a positive number'),
    phoneNo: yup.string().required('Phone Number is required'),
    gender: yup.string().required('Gender is required'),
    employmentStatus: yup.string().required('Employment Status is required'),
  });

const Register = () => {
    const navigate = useNavigate();
    const {signUp,updateUser,setError} = useContext(AuthContext);
    const {
        register, 
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Password Mismatch!!",
            showConfirmButton: false,
            timer: 1500
          });
          return;
        }
      
        try {
            const response = await signUp(data.email, data.password);
        
            if (!response.success) {
                if (response.error === "auth/email-already-in-use") {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Email Already in Use",
                        text: "The email address is already registered. Please use a different email.",
                        showConfirmButton: true,
                    });
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Registration Failed",
                        text: "An error occurred during registration. Please try again.",
                        showConfirmButton: true,
                    });
                }
                return;
            }
            const user = response.user;
            updateUser(data.fullName, data.photoUrl).then(()=>{
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
                        ...userImp,
                        age: parseInt(userImp.age, 10)
                    };
                    return axios.post('http://localhost:5000/user',updatedFormData).then(()=>{
                        setError("");
                        navigate('/');
                        return "Registration Successful"
                    }).catch((err)=>{
                        console.log(err)
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Registration Failed",
                            text: "An error occurred during registration. Please try again.",
                            showConfirmButton: true,
                        });
                        throw new Error(err)
                    })
                }
            })
        } catch (err) {
            setError(err)
            console.log(err)
        }
    }
      
  return (
    <div className='flex justify-center items-center pt-14 bg-gray-100 dark:bg-black'>
        <div className="bg-gray-200 p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center mb-6 text-secondary">Please Register
            <br/>
            <span className=" text-red-600 text-sm">* Required</span>                
            </h2>

            {/*form data*/}
            <form onSubmit={handleSubmit(onSubmit)}>

                {/*Full name and email */}
                <div className="flex items-center gap-5">
                    {/*name*/}
                    <div className="mb-4">
                        <label htmlFor="fullName" className='block text-gray-700 front-bold mb-2'>
                            <AiOutlineUser className="inline-block br-2 mb-1 text-lg"/>   Full Name<span className=" text-red-600">*</span>
                        </label>
                        <input type='text' placeholder="Enter your Full Name" {...register("fullName")} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                        {errors.fullName && <p className="text-red-600">{errors.fullName.message}</p>}
                    </div>
                    {/*email*/}
                    <div className="mb-4">
                        <label htmlFor="email" className='block text-gray-700 front-bold mb-2'>
                            <AiOutlineMail className="inline-block br-2 mb-1 text-lg"/>   Email<span className=" text-red-600">*</span>
                        </label>
                        <input type='text' placeholder="Enter your Email" {...register("email")} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                    </div>
                </div>

                {/**passwords */}
                <div className="flex items-center gap-5">
                    {/*password*/}
                    <div className="mb-4">
                        <label htmlFor="password" className='block text-gray-700 front-bold mb-2'>
                            <AiOutlineLock className="inline-block br-2 mb-1 text-lg"/>   Password<span className=" text-red-600">*</span>
                        </label>
                        <input type='password' placeholder="Enter a Password" {...register("password")} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                        {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                    </div>
                    {/*confirm password*/}
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className='block text-gray-700 front-bold mb-2'>
                            <AiOutlineLock className="inline-block br-2 mb-1 text-lg"/>   Confirm Password<span className=" text-red-600">*</span>
                        </label>
                        <input type='password' placeholder="Enter the Password Again" {...register("confirmPassword")} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                        {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
                    </div>
                </div>

                {/**username and age */}
                <div className="flex items-center gap-5">
                    {/**username */}
                    <div className="w-full mb-4">
                        <label htmlFor="userName" className='block text-gray-700 front-bold mb-2'>
                            <AiOutlineUser className="inline-block br-2 mb-1 text-lg"/>   Username<span className=" text-red-600">*</span>
                        </label>
                        <input type='text' placeholder="Enter Username" {...register("userName")} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                        {errors.userName && <p className="text-red-600">{errors.userName.message}</p>}
                    </div>
                    {/*age */}
                    <div className="w-full mb-4">
                        <label htmlFor="age" className='block text-gray-700 front-bold mb-2'>
                            <AiOutlineUser className="inline-block br-2 mb-1 text-lg"/>   Age<span className=" text-red-600">*</span>
                        </label>
                        <input type='number' placeholder="Enter your age" {...register("age")} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                        {errors.age && <p className="text-red-600">{errors.age.message}</p>}
                    </div>
                </div>

                {/**phone number and photo*/}
                <div className="flex items-center gap-5">
                    <div className="w-full mb-4">
                        <label htmlFor="phoneNo" className='block text-gray-700 front-bold mb-2'>
                            <AiOutlinePhone className="inline-block br-2 mb-1 text-lg"/>   Phone Number<span className=" text-red-600">*</span>
                        </label>
                        <input type='tel' placeholder="Enter your Phone Number" {...register("phoneNo")} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                        {errors.phoneNo && <p className="text-red-600">{errors.phoneNo.message}</p>}
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
                            <AiOutlineUser className="inline-block br-2 mb-1 text-lg"/>   Gender<span className=" text-red-600">*</span>
                        </label>
                        <select {...register("gender")} className="w-full border-gray-300 
                        border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300">
                            <option value="">Select Gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                        </select>
                    </div>
                    {errors.gender && <p className="text-red-600">{errors.gender.message}</p>}
                </div>

                {/**Employment status */}
                <div className="flex items-center gap-5">
                    <div className="w-full mb-4">
                        <label htmlFor="employmentStatus" className='block text-gray-700 front-bold mb-2'>
                            <AiOutlineUser className="inline-block br-2 mb-1 text-lg"/>   Employment Status<span className=" text-red-600">*</span>
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
                    {errors.employmentStatus && <p className="text-red-600">{errors.employmentStatus.message}</p>}
                </div>

                {/**address */}
                <div className="flex items-center gap-5">
                    <div className="w-full mb-4">
                        <label htmlFor="address" className='block text-gray-700 front-bold mb-2'>
                            <FiMapPin className="inline-block br-2 mb-1 text-lg"/>   Address
                        </label>
                        <textarea 
                            {...register("address")}
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