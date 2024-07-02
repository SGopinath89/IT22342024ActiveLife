import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { useState } from "react";
import Swal from 'sweetalert2'

const AddInstructor = () => {
    const [formData, setFormData] = useState({});
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
            axiosSecure.post('http://localhost:5000/instructor', formData)
                .then((res) => {
                    Swal.fire({
                    title: 'Success!',
                    text: 'Successfully Added a Diet.',
                    icon: 'success',
                    });
                    navigate('/dashboard/manageInstructors');
                })
                .catch((error) => {
                    console.log(error);
                    Swal.fire({
                    title: 'Error!',
                    text: 'There was an error adding a diet.',
                    icon: 'error',
                    });
                });
    };

  return (
    <div className='w-full justify-center items-center bg-white dark:bg-black flex'>
        <div className="bg-white p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold text-center mb-6 text-secondary">Add Doctor/Instructor</h2>
            <form onSubmit={handleSubmit} className="text-center">
                <div className="flex items-center gap-5 md:grid-cols-2 lg:grid-cols-2">
                    <div>
                        <div className="w-[300px] mb-4">
                            <label htmlFor="name" className='block text-gray-700 font-bold mb-2'>
                                Name
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
                        <div className="w-[500px] mb-4">
                            <label htmlFor="specialities" className='block text-gray-700 font-bold mb-2'>
                                Specialities
                            </label>
                            <textarea 
                                onChange={handleChange}
                                name="specialities"
                                rows="2"
                                className="w-full border-gray-300 
                                border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="">
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