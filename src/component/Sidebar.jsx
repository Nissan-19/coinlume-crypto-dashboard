import React from 'react'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { NavLink, useNavigate } from 'react-router-dom'
import {SidebarItem} from './SidebarItem'
import { LucideBitcoin, LucideChevronFirst, LucideChevronLast, LucideEye, LucideLayoutDashboard, LucideLogOut, LucideNewspaper} from 'lucide-react'




function Sidebar  ({isSidebarOpen, toggleSidebarOpen}) {
  const {resetTheme} = useTheme()
  const {logout} = useAuth()
  const navigate = useNavigate()

  function handleLogout(){
    logout()
    resetTheme()
    navigate("/login")
    
  }
  return (

    <aside
          className={
            isSidebarOpen
              ? "h-screen w-64 shrink-0 overflow-hidden transition-all duration-300"
              : "h-screen w-20 shrink-0 overflow-hidden transition-all duration-300"
          }
        >
        <nav className="flex h-full flex-col border-r bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className='p-4 flex items-center justify-between'>
            <h1
                className={`overflow-hidden whitespace-nowrap text-xl font-bold transition-all duration-300 ${
                  isSidebarOpen
                    ? "w-32 opacity-100"
                    : "w-0 opacity-0"
                  }`}
                >
                CoinLume
              </h1>
            <button onClick={toggleSidebarOpen}
                  className="rounded-lg bg-gray-100 p-2 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700">
              {isSidebarOpen? <LucideChevronFirst/>: <LucideChevronLast/>}
            </button>
          </div>


        <ul className='flex-1 space-y-2 px-3 py-4' >
            <li>
              
              <SidebarItem
                to="/dashboard"
                icon={<LucideLayoutDashboard size={20} />}
                label="Dashboard"
                isSidebarOpen={isSidebarOpen}
              />
            </li>

            <li>
              <SidebarItem
                to="/coins"
                icon={<LucideBitcoin size={20} />}
                label="Coins"
                isSidebarOpen={isSidebarOpen}
              />
            </li>

            <li>
                <SidebarItem
                  to="/watchlist"
                  icon={<LucideEye size={20} />}
                  label="Watchlist"
                  isSidebarOpen={isSidebarOpen}
                />
            </li>

            <li>
                <SidebarItem
                  to="/news"
                  icon={<LucideNewspaper size={20} />}
                  label="News"
                  isSidebarOpen={isSidebarOpen}
                />
            </li>         
        </ul>
          

          <div className="border-t border-gray-200 px-3 py-3 dark:border-slate-800">
              <ThemeToggle 
                isSidebarOpen={isSidebarOpen} />
              <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-800"
                >
                  <LucideLogOut size={20} />

                  <span
                  className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                    isSidebarOpen
                      ? "w-24 opacity-100"
                      : "w-0 opacity-0"
                  }`}
                >
                  Logout
                </span>
              </button>
          </div>

        </nav>

    </aside>
    
  )
}

export default Sidebar
