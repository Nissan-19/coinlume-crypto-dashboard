import React from 'react'
import LoginPage from './pages/LoginPage'
import AuthProvider from './context/AuthContext'
import { Route, Routes, Navigate } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './component/ProtectedRoute'
import CoinsPage from './pages/CoinsPage'
import WatchlistPage from './pages/WatchlistPage'
import NewsPage from './pages/NewsPage'
import CoinDetailsPage from './pages/CoinDetailsPage'



const App = () => {
  return (
    
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
       <Route path='/login' element={<LoginPage/>} />
       <Route path='/dashboard' element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}/>
       <Route path='/coins' element={<ProtectedRoute><CoinsPage/></ProtectedRoute>}/>
       <Route path='/watchlist' element={<ProtectedRoute><WatchlistPage/></ProtectedRoute>}/>
       <Route path='/news' element={<ProtectedRoute><NewsPage/></ProtectedRoute>}/>
       <Route path='/coin/:id' element={<ProtectedRoute><CoinDetailsPage/></ProtectedRoute>}/> 

      </Routes>
    </AuthProvider>
    
  )
}

export default App
