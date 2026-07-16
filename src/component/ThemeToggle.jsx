import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { Moon, Sun } from 'lucide-react'

function ThemeToggle ({isSidebarOpen}) {
    const{theme, toggleTheme} = useTheme()

    const isDark = (theme === "dark")  //Check whether theme is "dark" and save the answer as true or false.
  return (
    
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-800"
      //aria-lable is an accessibilty attribute in html
      //We usually need aria-label when a button has only an icon
      //Without it, a screen reader may just say “button” and not explain its purpose.
      >
      {isDark? <Sun size={20}/>:<Moon size={20}/>}
      <span
        className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
          isSidebarOpen
            ? "w-24 opacity-100"
            : "w-0 opacity-0"
        }`}
      >
        {isDark ? "Light mode" : "Dark mode"}
      </span>  

      </button>
    
  )
}

export default ThemeToggle
