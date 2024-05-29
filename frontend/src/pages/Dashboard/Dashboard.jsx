import React from 'react'
import useUser from '../../hooks/useUser';
import RotateLoader from 'react-spinners/RotateLoader'
import DashboardNavigate from '../../routes/DashboardNavigate';

const Dashboard = () => {
  const {currentUser, isLoading,} = useUser();
  const role = currentUser?.role;
  if(isLoading){
    return <div className='flex justify-center items-center h-screen'>
      <RotateLoader color="#C1A917" />
    </div>
  }
  return (
    <div>
      <DashboardNavigate/>
    </div>
  )
}

export default Dashboard