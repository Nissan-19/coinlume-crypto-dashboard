import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

const demoUsername = "user"                                                           //AuthProvider  is a function that owns and shares the data.
const demoPassword = "1234"                                                           //AuthContext carries the data.
                                                                                      //useAuth is used to reads the data from other components.

function AuthProvider  ({children})  {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [displayName, setDisplayName]  = useState("")

  function login(enteredDisplayName, username, password){
    
    if( 
        username.trim() === demoUsername &&
        password.trim()===demoPassword
      
        ){
          const cleanedDisplayName = enteredDisplayName.trim()

        //updating the react state here thst will dispaly on refresh
        setIsAuthenticated(true)
        setDisplayName(enteredDisplayName.trim())

        //preparing the authentication data to save on the local storage. 
        const authData={
          isAuthenticated: true,
          displayName: cleanedDisplayName,
        }

        localStorage.setItem("coinlume_auth", JSON.stringify(authData))

      return true
    }
    return false
  }

    /*data that are avaliable to the children or wrapped components*/
    return (
      <AuthContext.Provider
          value={{isAuthenticated, displayName, login}}>   
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
