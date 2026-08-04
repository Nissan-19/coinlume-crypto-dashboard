import { createContext, useContext, useEffect, useState } from 'react'


const ThemeContext = createContext()

function ThemeProvider({children}){

    const[theme, setTheme] = useState(()=>{
        try{

            const storedTheme = localStorage.getItem("theme")

            if(!storedTheme){
                return "light" 
            }

            return storedTheme
        }
        
         catch(error){
            console.log("Could not load saved theme.", error)
            localStorage.removeItem("theme")
            return "light"
        }
    })

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
