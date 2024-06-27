import React, { useContext ,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utilities/providers/AuthProvider'

const useAxiosSecure = () => {
  const {logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL:''
  });
  useEffect(()=>{
    //add request interceptors
    const requestInterceptor = axiosSecure.interceptors.request.use((config)=>{
      const token = localStorage.getItem('token');
      if(token){
        config.headers.Authorization = `Bearer ${token}`;

      }
      return config;
    })

    //add response interceptors
    const responseInterceptor = axiosSecure.interceptors.response.use((response) => response, 
      async (error) => {
        console.log(response); 
          console.log('Interceptor Error:', error);
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.log('Unauthorized or Forbidden Error');
            await logout();
            navigate('/login');
            return Promise.reject(error)
          }
        //throw error;
    });
       
      
    return ()=>{
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    }
  },[logout,navigate])
  return axiosSecure;
}
export default useAxiosSecure

