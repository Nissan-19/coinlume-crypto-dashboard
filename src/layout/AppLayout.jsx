import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../component/Sidebar'

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default AppLayout
