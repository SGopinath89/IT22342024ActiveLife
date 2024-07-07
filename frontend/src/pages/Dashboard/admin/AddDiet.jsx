import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from 'sweetalert2'

const AddDiet = () => {
    const [formData, setFormData] = useState({
        forGoal: []
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
                        forGoal: [...prevState.forGoal, value]
                    };
                } else {
                    return {
                        ...prevState,
                        forGoal: prevState.forGoal.filter(goal => goal !== value)
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
        axiosSecure.post('http://localhost:5000/diet', formData)
            .then((res) => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Successfully Added a Diet.',
                    icon: 'success',
                    timer: 1500
                });
                navigate('/dashboard/manageDiets');
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error adding a diet.',
                    icon: 'error',
                    timer: 1500
                });
            });
    };

    return (
        <div className='w-screen h-screen justify-top items-center'>
            <div className="bg-white p-8 w-[1000px] rounded-lg ">
                <h2 className="text-3xl font-bold text-center mb-6 text-secondary">Add Diet<br/><span className=" text-red-600 text-sm">* Required</span></h2>
                <form onSubmit={handleSubmit} className="text-center">
                    <div className="flex items-center gap-5 md:grid-cols-2 lg:grid-cols-2">
                        <div>
                            <div className="w-[300px] mb-4">
                                <label htmlFor="name" className='block text-gray-700 font-bold mb-2'>
                                    Name of the Diet
                                    <span className=" text-red-600">*</span>
                                </label>
                                <input 
                                    type='text' 
                                    name="name"
                                    placeholder="Enter the Name of the Diet" 
                                    onChange={handleChange}
                                    className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"/>
                            </div>
                            <div className="w-[300px] mb-4">
                                <label htmlFor="dietImg" className='block text-gray-700 font-bold mb-2'>
                                    Diet Image
                                </label>
                                <input 
                                    type='text' 
                                    name="dietImg"
                                    placeholder="Enter the Image URL" 
                                    onChange={handleChange}
                                    className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"/>
                            </div>
                            <div className="w-[300px] mb-4">
                                <label htmlFor="forGoal" className='block text-gray-700 font-bold mb-2'>
                                    Goals that can achieve from Diet 
                                    <span className=" text-red-600">*</span><br/>
                                </label>
                                <input type="checkbox" name="forGoal" onChange={handleChange} value="Weight Loss"/> Weight Loss<br/>
                                <input type="checkbox" name="forGoal" onChange={handleChange} value="Brain Health"/> Brain Health<br/>
                                <input type="checkbox" name="forGoal" onChange={handleChange} value="Overall Health"/> Overall Health<br/>
                                <input type="checkbox" name="forGoal" onChange={handleChange} value="Longevity"/> Longevity<br/>
                                <input type="checkbox" name="forGoal" onChange={handleChange} value="Diabetes Management"/> Diabetes Management<br/>
                                <input type="checkbox" name="forGoal" onChange={handleChange} value="Heart Health"/> Heart Health
                            </div>
                        </div>
                        <div>
                            {/**How it works */}
                            <div className="w-[500px] mb-4">
                                <label htmlFor="howItWorks" className='block text-gray-700 font-bold mb-2'>
                                   How It Works
                                   <span className=" text-red-600">*</span>
                                </label>
                                <textarea 
                                    onChange={handleChange}
                                    name="howItWorks"
                                    className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                                    placeholder="">
                                </textarea>
                            </div>
                            {/**Benefits */}
                            <div className="w-[500px] mb-4">
                                <label htmlFor="benefits" className='block text-gray-700 font-bold mb-2'>
                                    Benefits
                                    <span className=" text-red-600">*</span>
                                </label>
                                <textarea 
                                    onChange={handleChange}
                                    name="benefits"
                                    rows="2"
                                    className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                                    placeholder="">
                                </textarea>
                            </div>
                            {/**Downsides */}
                            <div className="w-[500px] mb-4">
                                <label htmlFor="downsides" className='block text-gray-700 font-bold mb-2'>
                                    Downsides
                                </label>
                                <textarea 
                                    onChange={handleChange}
                                    name="downsides"
                                    rows="2"
                                    className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                                    placeholder="">
                                </textarea>
                            </div>
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
                    <Link to="/dashboard/manageDiets">
                        <button className="bg-red-300 justify-center hover:bg-red-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Cancel
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AddDiet
