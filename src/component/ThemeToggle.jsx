import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { Moon, Sun } from 'lucide-react'

function ThemeToggle () {
    const{theme, toggleTheme} = useTheme()

    const isDark = (theme === "dark")  //Check whether theme is "dark" and save the answer as true or false.
  return (
    
      <button type='button'
      onClick={toggleTheme}
      aria-label={isDark? "Switch to light mode" : "Switch to dark mode"}
      //aria-lable is an accessibilty attribute in html
      //We usually need aria-label when a button has only an icon
      //Without it, a screen reader may just say “button” and not explain its purpose.
      >
      {isDark? <Sun size={20}/>:<Moon size={20}/>}
      <span>
        {isDark ? "Light mode" : "Dark mode"}
        </span>  

      </button>
    
  )
}

export default ThemeToggle
