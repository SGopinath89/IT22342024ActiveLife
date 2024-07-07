import React, { useState, useEffect } from 'react';
import useUser from '../../../hooks/useUser';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link,  useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateD = () => {
    const { dietId } = useParams();
    const { currentUser, refetch } = useUser();
    const [dietData, setdietData] = useState({
        name: "",
        howItWorks: "",
        benefits: "",
        downsides: "",
        dietImg: ""
    });
    const [formData, setFormData] = useState({});
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (currentUser?.email) {
            axiosSecure.get(`http://localhost:5000/diet/${dietId}`)
                .then((res) => {
                    //console.log(res.data)
                    setdietData({
                        name: res.data.name,
                        howItWorks: res.data.howItWorks,
                        benefits: res.data.benefits,
                        downsides:res.data.downsides,
                        dietImg: res.data.dietImg
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [axiosSecure, currentUser?.email]);

    const handleChange = (e) => {
        const { name, value} = e.target;

            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        
    };

    const handleSubmit = (e) => {  
        e.preventDefault();
        axiosSecure.patch(`http://localhost:5000/diet/${dietId}`, formData)
            .then((res) => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Diet details have been updated.',
                    icon: 'success',
                    timer: 1500
                });
                refetch();
                navigate('/dashboard/manageDiets');
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error updating Diet.',
                    icon: 'error',
                    timer: 1500
                });
            });
    };

  return (
    <div className='w-screen h-screen justify-top items-center'>
        <div className="bg-white p-8 w-[1000px] rounded-lg ">
            <h2 className="text-3xl font-bold text-center mb-6 text-secondary">Edit Diet</h2>
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
                            placeholder={dietData.name} 
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
                            placeholder={dietData.dietImg} 
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
                                placeholder={dietData.howItWorks}>
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
                                placeholder={dietData.benefits}>
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
                                placeholder={dietData.downsides}>
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

export default UpdateD