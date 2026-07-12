import React from 'react'
import LoginPage from './pages/LoginPage'
import AuthProvider from './context/AuthContext'
import { Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'



const App = () => {
  return (
    
    <AuthProvider>
      <Routes>
       <Route path='/login' element={<LoginPage/>} />
       <Route path='/dashboard' element={<DashboardPage/>} />
      </Routes>
    </AuthProvider>
    
  )
}

export default App
