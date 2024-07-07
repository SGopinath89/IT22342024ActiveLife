import React, { useState, useEffect } from 'react';
import useUser from '../../hooks/useUser';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateUserDetails = () => {
  const { currentUser, refetch } = useUser();
  const [formData, setFormData] = useState({});
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName,
        email: currentUser.email,
        gender: currentUser.gender,
        phoneNo: currentUser.phoneNo,
        age: currentUser.age,
        address: currentUser.address,
        photoUrl:currentUser.photoUrl,
        password:currentUser.password,
        userName:currentUser.userName,
        employmentStatus: currentUser.employmentStatus,
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      age: parseInt(formData.age, 10)
    };
    axiosSecure.patch(`http://localhost:5000/user/${currentUser._id}`, updatedFormData)
      .then((res) => {
        Swal.fire({
          title: 'Success!',
          text: 'Your details have been updated.',
          icon: 'success',
          timer: 1500
        });
        refetch();
        if(currentUser.role=="user"){
          navigate('/dashboard/userP');
        }else if(currentUser.role="admin"){
          navigate('/dashboard/adminHome');
        }
        console.log(currentUser.phoneNo)
        
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an error updating your details.',
          icon: 'error',
          timer: 1500
        });
      });
  };

  return (
    <div className='w-screen h-screen justify-top items-center'>
      <br/>
      <form className='w-full max-w-lg' onSubmit={handleSubmit}>
        <div className='shadow-lg rounded-lg p-6'>
          <h2 className='text-2xl font-bold mb-6'>Edit Your Details</h2>
            <div className='p-4 grid md:grid-cols-2 lg:grid-cols-2 gap-4 '>
                <div className='justify-center'>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='fullName'>
                        Full Name
                        </label>
                        <input
                        id='fullName'
                        name='fullName'
                        type='text'
                        value={formData.fullName || ''}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                        Email
                        </label>
                        <input
                        id='email'
                        name='email'
                        type='email'
                        value={formData.email || ''}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        required
                        />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="gender" className='block text-gray-700 front-bold mb-2'>
                      Gender
                      </label>
                      <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                      >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      </select>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phoneNo'>
                        Phone Number
                        </label>
                        <input
                        id='phoneNo'
                        name='phoneNo'
                        type='text'
                        value={formData.phoneNo || ''}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='userName'>
                        Username
                        </label>
                        <input
                        id='userName'
                        name='userName'
                        type='text'
                        value={formData.userName || ''}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        required
                        />
                    </div>
                </div>
                <div className='justify-center'>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='age'>
                        Age
                        </label>
                        <input
                        id='age'
                        name='age'
                        type='number'
                        value={formData.age || ''}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='address'>
                        Address
                        </label>
                        <input
                        id='address'
                        name='address'
                        type='text'
                        value={formData.address || ''}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        
                        />
                    </div>
                    <div className="mb-4">
                            <label htmlFor="employmentStatus" className='block text-gray-700 front-bold mb-2'>
                                Employment Status
                            </label>
                            <select
                                name="employmentStatus"
                                value={formData.employmentStatus}
                                onChange={handleChange}
                                className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                            >
                                <option value="">Select</option>
                                <option value="undergraduate">Undergraduate</option>
                                <option value="school">School</option>
                                <option value="working">Working</option>
                                <option value="unemployed">Unemployed</option>
                            </select>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='photoUrl'>
                        Photo URL
                        </label>
                        <input
                        id='photoUrl'
                        name='photoUrl'
                        type='text'
                        value={formData.photoUrl || ''}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        
                        />
                    </div><br/>
                    <div className='mb-3'>
                      <Link to="/dashboard/updatePassword">
                        <button
                        className='bg-[#f2e48d] justify-center hover:bg-secondary text-black font-bold py-2 px-4 
                        rounded focus:outline-none focus:shadow-outline'
                        >
                          Update Password
                        </button>
                      </Link>
                    </div>
                </div>  
            </div>
            <div className='p-4 grid md:grid-cols-2 lg:grid-cols-2 gap-4 '>
              <div>
                <button
                    type='submit'
                    className='bg-[#f2e48d] justify-center hover:bg-secondary text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                    Save Changes
                </button>
              </div>
              <div>
                <Link to="/dashboard">
                    <button
                      type='cancle'
                      className='bg-red-300 justify-center hover:bg-red-500 text-black font-bold py-2 px-4 
                      rounded focus:outline-none focus:shadow-outline'
                    >
                      Cancle
                    </button>
                </Link>
              </div>
            </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserDetails;
