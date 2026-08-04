import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../component/Sidebar'
import Header from '../component/Header'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCurrencyRates } from "../features/currency/currencySlice"

function AppLayout  ()  {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const dispatch = useDispatch()

  const currencyStatus = useSelector((state) => state.currency.status)

  useEffect(() => {
    if (currencyStatus === "idle") {
      dispatch(fetchCurrencyRates())
    }
  }, [currencyStatus, dispatch])

  function toggleSidebarOpen(){
    setIsSidebarOpen(!isSidebarOpen)
  }
  return (
      <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-white">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebarOpen={toggleSidebarOpen}
        />

          <div className='flex min-w-0 flex-1 flex-col'>
            <Header/>
        
            <main className="flex-1 p-6 transition-all duration-300">
             <Outlet />
            </main>
          </div>
        </div>
  )
}

export default AppLayout
