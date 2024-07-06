import React, { useState, useEffect } from 'react';
import useUser from '../../../hooks/useUser';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link,  useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateI = () => {
    const { instructorId } = useParams();
    const { currentUser, refetch } = useUser();
    const [instructorData, setinstructorData] = useState({
        name: "",
        email: "",
        phoneNo: "",
        qualification: "",
        experience: "",
        specialities: ""
    });
    const [formData, setFormData] = useState({});
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser?.email) {
            axiosSecure.get(`http://localhost:5000/instructor/${instructorId}`)
                .then((res) => {
                    setinstructorData({
                        name: res.data.name,
                        email: res.data.email,
                        phoneNo: res.data.phoneNo,
                        qualification: res.data.qualification,
                        experience: res.data.experience,
                        specialities: res.data.specialities
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
        e.preventDefault();
        axiosSecure.patch(`http://localhost:5000/instructor/${instructorId}`, formData)
            .then((res) => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Instructor/Doctor details have been updated.',
                    icon: 'success',
                });
                refetch();
                navigate('/dashboard/manageInstructors');
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error updating Instructor/Doctor.',
                    icon: 'error',
                });
            });
    };
  return (
    <div className='w-[1000px] justify-center items-center bg-white dark:bg-black flex'>
        <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold text-center mb-6 text-secondary">Edit Doctor/Instructor</h2>
                <form onSubmit={handleSubmit} className="text-center">
                    <div className="flex items-center gap-5 md:grid-cols-2 lg:grid-cols-2">
                        <div>
                            <div className="w-[300px] mb-4">
                                <label htmlFor="name" className='block text-gray-700 front-bold mb-2'>
                                    Name
                                </label>
                                <input 
                                type='text' 
                                name="name"
                                placeholder={instructorData.name} 
                                onChange={handleChange}
                                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                                focus:border-blue-300"/>
                            </div>
                            <div className="w-[300pxpx] mb-4">
                                <label htmlFor="email" className='block text-gray-700 front-bold mb-2'>
                                    Email
                                </label>
                                <input 
                                type='text' 
                                name="email"
                                placeholder={instructorData.email} 
                                onChange={handleChange}
                                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                                focus:border-blue-300"/>
                            </div>
                            <div className="w-[300pxpx] mb-4">
                                <label htmlFor="phoneNo" className='block text-gray-700 front-bold mb-2'>
                                    Phone Number
                                </label>
                                <input 
                                type='text' 
                                name="phoneNo"
                                placeholder={instructorData.phoneNo} 
                                onChange={handleChange}
                                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                                focus:border-blue-300"/>
                            </div>
                        </div>
                        <div>
                            <div className="w-[500px] mb-4">
                                <label htmlFor="qualification" className='block text-gray-700 front-bold mb-2'>
                                Qualifications
                                </label>
                                <textarea 
                                    onChange={handleChange}
                                    rows=""
                                    name="qualification"
                                    className="w-full border-gray-300 
                                    border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                                    placeholder={instructorData.qualification}>
                                </textarea>
                            </div>
                            <div className="w-[500px] mb-4">
                                <label htmlFor="experience" className='block text-gray-700 front-bold mb-2'>
                                    Experiences
                                </label>
                                <textarea 
                                    onChange={handleChange}
                                    name="experience"
                                    rows="2"
                                    className="w-full border-gray-300 
                                    border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                                    placeholder={instructorData.experience}>
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

export default UpdateI