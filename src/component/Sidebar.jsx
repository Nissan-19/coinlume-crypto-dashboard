import React from 'react'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Sidebar  () {
  const {resetTheme} = useTheme()
  const {logout} = useAuth()
  const navigate = useNavigate()

  function handleLogout(){
    logout()
    resetTheme()
    navigate("/login")
    
  }
  return (
    <div >
      <h1>Coinlume sidebar</h1>
      <ThemeToggle/>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Sidebar
