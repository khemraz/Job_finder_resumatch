import React from 'react'
import { isAuthenticated } from '../api/userAPI'
import { Navigate, Outlet } from 'react-router-dom'

const UserRoute = () => {
    let {user}=isAuthenticated()
  return (

    <div>
        {user && user.role==0?<Outlet/>:<Navigate to={'/login'}/>}
    </div>
  )
}

export default UserRoute