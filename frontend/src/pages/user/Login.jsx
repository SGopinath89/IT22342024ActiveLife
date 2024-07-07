import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdAlternateEmail } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import GoogleLogin from '../../components/Social/GoogleLogin';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  const location = useLocation();
  const { login, error, setError, loader, setLoader } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')

    const data = new FormData(e.target);
    const formData = Object.fromEntries(data);

    try {
      setLoader(true);
      const user = await login(formData.email, formData.password);
      
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful!!",
        showConfirmButton: false,
        timer: 1500
      });

      navigate(location.state?.from || '/', { state: { user } });

    } catch (error) {
      console.log(error);
      setError(error.code);

      if (!formData.email && formData.password || !formData.password && formData.email) {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Fill all the fields",
          showConfirmButton: false,
          timer: 1500,
          
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Give correct Email and password <br/> OR <br/> use Google",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'swal2-custom-popup'
          },
          didOpen: () => {
            const popup = document.querySelector('.swal2-custom-popup');
            if (popup) {
              popup.style.width = '350px'; 
              popup.style.height = '300px'; 
              popup.style.fontSize = '0.8em'; 
            }
          }
        });
      }

    } finally {
      setLoader(false);
    }
  }

  return (
    <div className='mx-auto max-w-screen-xl px-4 py-16 lg:px-8 bg-gray-100 dark:bg-black'>
      <h1 className='text-2xl font-bold text-secondary sm:text-3xl text-center'>Let's Get Started!!</h1>
      <p className='mx-auto mt-4 max-w-md text-center text-gray-500'>Explore our Exclusive diet plans and Workout routines!!!</p>
      <div className='mx-auto max-w-lg mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-gray-200'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <p className='text-center text-red-400 text-lg font-medium'>Sign in to your account</p>
          <div>
            <label htmlFor='email' className='sr-only'>Email</label>
            <div className='relative'>
              <input type='email' name='email' placeholder='Enter Email' className='w-full text-center border outline-none rounded-lg border-gray-200 pe-12 text-lg shadow-sm h-10' />
              <span className='absolute inset-y-0 end-0 grid place-content-center px-4'><MdAlternateEmail className='h-4 w-4 text-gray-400' /></span>
            </div>
          </div>

          <div>
            <label htmlFor='password' className='sr-only'>Password</label>
            <div className='relative'>
              <input type={showPassword ? 'text' : 'password'} name='password' placeholder='Enter Password' className='w-full text-center border outline-none rounded-lg border-gray-200 pe-12 text-lg shadow-sm h-10' />
              <span onClick={() => setShowPassword(!showPassword)} className='absolute inset-y-0 end-0 grid place-content-center px-4'><IoEyeOutline className='h-4 w-4 text-gray-400' /></span>
            </div>
          </div>
          <button type='submit' className='block w-full rounded-lg bg-secondary px-5 py-3 font-medium text-white text-lg'>Sign-in</button>
          <p className='text-center text-sm text-gray-500'>No account? <Link className='underline text-secondary' to="/register">Sign-up</Link></p>
          <GoogleLogin />
        </form>
      </div>
    </div>
  )
}

export default Login;
