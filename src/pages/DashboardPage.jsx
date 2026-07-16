import React from 'react'
import { useAuth } from '../context/AuthContext'


function DashboardPage  ()  {
    const{displayName} = useAuth()
    
  return (
    <div>
      <h1>Dashboard page</h1>
      <h2>welcome {displayName}</h2>
    </div>
  )
}

export default DashboardPage
