import React from 'react'
import useUser from "../hooks/useUser";
import RotateLoader from 'react-spinners/RotateLoader';
import { Navigate } from 'react-router-dom';

export const DashboardNavigate = () => {
const {currentUser, isLoading,} = useUser();
  const role = currentUser?.role;
  if(isLoading){
    return <div className='flex justify-center items-center h-screen'>
      <RotateLoader color="#C1A917" />
    </div>
  }
  if(role === 'admin')return <Navigate to="/dashboard/adminHome" replace/>
  if(role === 'user')return <Navigate to="/dashboard/userP" replace/>
  
}

export default DashboardNavigate