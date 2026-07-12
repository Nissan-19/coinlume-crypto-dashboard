
import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute  () {
    const{isAuthenticated, authIsLoading} = useAuth()
    const navigate = useNavigate()

  return (
    <div>
      {authIsLoading&&
        <h1>Loading Data</h1>
        }

    {isAuthenticated && 
        navigate("/dashboard")}
    

    { !isAuthenticated &&
        navigate("/LoginPage")
    }
    </div>
  )
}

export default ProtectedRoute
