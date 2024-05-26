import { useForm } from "react-hook-form"
import { AiOutlineLock, AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";

const Register = () => {
    const {register, handleSubmit,watch,formState: { errors }} = useForm();
    const onSubmit = (data) => console.log(data)
  return (
    <div className='flex justify-center items-center pt-14 bg-gray-100'>
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center mb-6">Please Register</h2>

            {/*form data*/}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center gap-5">
                    <div className="mb-4">
                        <lable htmlFor="name" className='block text-gray-700 front-bold mb-2'>
                            <AiOutlineUser className="inline-block br-2 mb-1 text-lg"/>   Full Name
                        </lable>
                        <input type='text' placeholder="Enter your Full Name" {...register("fullName",{required:true})} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                    </div>
                    <div className="mb-4">
                        <lable htmlFor="email" className='block text-gray-700 front-bold mb-2'>
                            <AiOutlineMail className="inline-block br-2 mb-1 text-lg"/>   Email
                        </lable>
                        <input type='text' placeholder="Enter your Email" {...register("fullName",{required:true})} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <div className="mb-4">
                        <lable htmlFor="password" className='block text-gray-700 front-bold mb-2'>
                            <AiOutlineLock className="inline-block br-2 mb-1 text-lg"/>   Password
                        </lable>
                        <input type='password' placeholder="Enter a Password" {...register("password",{required:true})} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                    </div>
                    <div className="mb-4">
                        <lable htmlFor="confirmPassword" className='block text-gray-700 front-bold mb-2'>
                            <AiOutlineLock className="inline-block br-2 mb-1 text-lg"/>   Confirm Password
                        </lable>
                        <input type='password' placeholder="Enter the Password Again" {...register("confirmPassword",{required:true})} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <div className="w-full mb-4">
                        <lable htmlFor="phoneNumber" className='block text-gray-700 front-bold mb-2'>
                            <AiOutlinePhone className="inline-block br-2 mb-1 text-lg"/>   Phone Number
                        </lable>
                        <input type='tel' placeholder="Enter your Phone Number" {...register("phone",{required:true})} 
                        className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                        focus:border-blue-300"/>
                    </div>
                    
                </div>
            </form>
        </div>
    </div>
    
  )
}

export default Register