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
import AppLayout from './layout/AppLayout'



const App = () => {
  return (
    
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<LoginPage/>} />
        <Route
            element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
            
            <Route path='/dashboard' element={<DashboardPage/>}/>
            <Route path='/coins' element={<CoinsPage/>}/>
            <Route path='/watchlist' element={<WatchlistPage/>}/>
            <Route path='/news' element={<NewsPage/>}/>
            <Route path='/coins/:id' element={<CoinDetailsPage/>}/>        
        </Route>
      </Routes>
    </AuthProvider>
    
  )
}

export default App
