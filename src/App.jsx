import React from 'react'
import LoginPage from './pages/LoginPage'
import AuthProvider from './context/AuthContext'


const App = () => {
  return (
    
    <AuthProvider>
      <div>
        <LoginPage/>
      </div>
    </AuthProvider>
    
  )
}

export default App
