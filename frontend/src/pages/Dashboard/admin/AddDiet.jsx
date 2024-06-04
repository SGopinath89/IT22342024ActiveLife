import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { useState } from "react";
import Swal from 'sweetalert2'

const AddDiet = () => {
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
            axiosSecure.post('/new-diet', formData)
                .then((res) => {
                    Swal.fire({
                    title: 'Success!',
                    text: 'Successfully Added a Diet.',
                    icon: 'success',
                    });
                    navigate('/dashboard/manageDiets');
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
    <div className='w-[1100px] justify-center items-center bg-white dark:bg-black flex'>
        <div className="bg-white p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold text-center mb-6 text-secondary">Add Diet</h2>
            <form onSubmit={handleSubmit} className="text-center">
                <div className="flex items-center gap-5 md:grid-cols-2 lg:grid-cols-2">
                    <div>
                        <div className="w-[300px] mb-4">
                            <label htmlFor="name" className='block text-gray-700 front-bold mb-2'>
                                Name of the Diet
                            </label>
                            <input 
                            type='text' 
                            name="name"
                            placeholder="Enter the Name of the Diet" 
                            onChange={handleChange}
                            className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                            focus:border-blue-300"/>
                        </div>
                        <div className="w-[300pxpx] mb-4">
                            <label htmlFor="dietImg" className='block text-gray-700 front-bold mb-2'>
                                Diet Image
                            </label>
                            <input 
                            type='text' 
                            name="dietImg"
                            placeholder="Enter the Image URL" 
                            onChange={handleChange}
                            className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                            focus:border-blue-300"/>
                        </div>
                    </div>
                    <div>
                        {/**How it works */}
                        <div className="w-[500px] mb-4">
                            <label htmlFor="howItWorks" className='block text-gray-700 front-bold mb-2'>
                               How It Works
                            </label>
                            <textarea 
                                onChange={handleChange}
                                rows=""
                                name="howItWorks"
                                className="w-full border-gray-300 
                                border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="">
                            </textarea>
                        </div>
                        {/**Benefits */}
                        <div className="w-[500px] mb-4">
                            <label htmlFor="benefits" className='block text-gray-700 front-bold mb-2'>
                                Benefits
                            </label>
                            <textarea 
                                onChange={handleChange}
                                name="benefits"
                                rows="2"
                                className="w-full border-gray-300 
                                border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="">
                            </textarea>
                        </div>
                        {/**Downsides */}
                        <div className="w-[500px] mb-4">
                            <label htmlFor="downsides" className='block text-gray-700 front-bold mb-2'>
                                Downsides
                            </label>
                            <textarea 
                                onChange={handleChange}
                                name="downsides"
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
                <Link to="/dashboard/manageDiets">
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

export default AddDiet