import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function DashboardPage  ()  {
    const{displayName, logout} = useAuth()
    const navigate = useNavigate()
    
    function handleLogout(){
      logout()
      navigate("/login")
    }

  return (
    <div>
      <h1>Dashboard page</h1>
      <h2>welcome{displayName}</h2>
      <button
        onClick={handleLogout}
        >
        Logout
      </button>
    </div>
  )
}

export default DashboardPage
