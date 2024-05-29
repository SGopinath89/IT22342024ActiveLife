import React from 'react'
import useUser from '../../../hooks/useUser'

const UserP = () => {
    const {currentUser} = useUser();

  return (
    <div>
        {currentUser.email}
        <br/>
        {currentUser.fullName}
    </div>
  )
}

export default UserP