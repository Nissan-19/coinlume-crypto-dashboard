import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

const demoUsername = "user"                                                           //AuthProvider  is a function that owns and shares the data.
const demoPassword = "1234"                                                           //AuthContext carries the data.
                                                                                      //useAuth is used to reads the data from other components.
function AuthProvider  ({children})  {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [displayName, setDisplayName]  = useState("")
    const [authIsLoading, setAuthIsLoading] = useState(true)

    useEffect(()=>{
      const savedAuthData=localStorage.getItem("coinlume_auth")
      
      if(!savedAuthData){
        setAuthIsLoading(false)
        return
      }

      const parsedAuthdata= JSON.parse(savedAuthData)
      setIsAuthenticated(parsedAuthdata.isAuthenticated)
      setDisplayName(parsedAuthdata.displayName)
      setAuthIsLoading(false)
    },[])

  function login(enteredDisplayName, username, password){
    
    if( 
        username.trim() === demoUsername &&
        password.trim()===demoPassword
      
        ){
          const cleanedDisplayName = enteredDisplayName.trim()

        //updating the react state here but the state alone will disapper on refresh
        setIsAuthenticated(true)
        setDisplayName(enteredDisplayName.trim())

        //so we creaate this small object that will save in localStorage 
        const authData={
          isAuthenticated: true,
          displayName: cleanedDisplayName,
        }

        localStorage.setItem("coinlume_auth", JSON.stringify(authData))

      return true
    }
    return false
  }

    function logout(){
      setIsAuthenticated(false)
      setDisplayName("")
      localStorage.removeItem("coinlume_auth")
      
    }

    /*data that are avaliable to the children or wrapped components*/
    return (
      <AuthContext.Provider
          value={{isAuthenticated, displayName, authIsLoading, login, logout}}>   
              {children}
      </AuthContext.Provider>
  )
}

export function useAuth(){                    //exporting a custom hook useauth so that other component can import it
  const context = useContext(AuthContext)     //context reads the data travelling through authcontext and savesit

    if(!context){                             //If no authentication data was received from AuthProvider, something is wrong.
      throw new Error ("UseAuth Must be used inside AuthProvider")
    }
    return context
}

export default AuthProvider
