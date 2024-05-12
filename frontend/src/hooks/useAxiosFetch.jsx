import React, { useEffect } from 'react'
import axios from 'axios'

const useAxiosFetch = () => {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000/',
        
    });

    //Interceptors
    useEffect(()=>{
        const requestInterceptor = axios.interceptors.request.use((config)=>{
            return config;
        },(error)=>{
            return Promise.reject(error);
        });
        //Response Interceptors
        const responseInterceptor = axios.interceptors.response.use((response)=>{
            return response;
        },(error)=>{
            return Promise.reject(error);
        });

        return ()=>{
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        }
            
    },[axiosInstance])

    return axiosInstance;
}
export default useAxiosFetch