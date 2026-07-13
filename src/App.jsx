import React from 'react'
import LoginPage from './pages/LoginPage'
import AuthProvider from './context/AuthContext'
import { Route, Routes, Navigate } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './component/ProtectedRoute'



const App = () => {
  return (
    
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
       <Route path='/login' element={<LoginPage/>} />
       <Route path='/dashboard' element={
          <ProtectedRoute>
            <DashboardPage/>
          </ProtectedRoute>
       }/> 
      </Routes>
    </AuthProvider>
    
  )
}

export default App
