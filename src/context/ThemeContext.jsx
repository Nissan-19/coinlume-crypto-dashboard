import React, { createContext, useContext, useEffect, useState } from 'react'
import { Provider } from 'react-redux'

const ThemeContext = createContext()

function ThemeProvider({children}){
    const[theme, setTheme] = useState("light")

    useEffect(() => {
        const rootElement = document.documentElement

        if (theme === "dark") {
            rootElement.classList.add("dark")
        } else {
            rootElement.classList.remove("dark")
        }

        localStorage.setItem("theme", theme)
        }, [theme])
    function toggleTheme(){
        if(theme === "light"){
            setTheme("dark")
            return
        }

        setTheme("light")
    }
    
  return (
    <ThemeContext.Provider
        value={{theme, toggleTheme}}>
            {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(){
    const context = useContext(ThemeContext)
    if(!context){        
      throw new Error ("UseTheme Must be used inside ThemeProvider")
    }
    return context
}

export default ThemeProvider
