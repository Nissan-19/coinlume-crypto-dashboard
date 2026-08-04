import { useTheme } from '../context/ThemeContext'
import { Moon, Sun } from 'lucide-react'

function ThemeToggle ({isSidebarOpen}) {
    const{theme, toggleTheme} = useTheme()

    const isDark = (theme === "dark") 
  return (
    
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-slate-800"
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
