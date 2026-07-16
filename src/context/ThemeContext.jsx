import React, { createContext, useContext, useEffect, useState } from 'react'


const ThemeContext = createContext()

function ThemeProvider({children}){

    const[theme, setTheme] = useState(()=>{
        try{

            const storedTheme = localStorage.getItem("theme")

            if(!storedTheme){
                return "light" 
            }

            return storedTheme
            //Inside the starting function, return the value. Do not call the setter as the react is currently creating the state.
        }
        
         catch(error){
            console.log("Could not load saved theme.", error)
            localStorage.removeItem("theme")
            return "light"
        }
    })

    useEffect(() => {
        const rootElement = document.documentElement  //documentElement means the page’s main element ie html

        if (theme === "dark") {
            rootElement.classList.add("dark") //reate/add a CSS class named dark to the <html> element’s class list.
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

function resetTheme() {
        setTheme("light")
    }

  return (
    <ThemeContext.Provider
        value={{theme, toggleTheme, resetTheme}}>
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
