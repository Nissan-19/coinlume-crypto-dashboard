
import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

function ProtectedRoute  ({children}) {
    const{isAuthenticated, authIsLoading} = useAuth()
    

      if(authIsLoading){
        return <h1>Checking Authentication...</h1>
      }
    
      if(!isAuthenticated) {
        return <Navigate to= "/login" replace />
      }
    

  return children
}

export default ProtectedRoute
