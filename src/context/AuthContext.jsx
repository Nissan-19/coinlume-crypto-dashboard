import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

const demoUsername = "user"
const demoPassword = "1234"

function AuthProvider  ({children})  {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [displayName, setDisplayName]  = useState("")

function login(enteredDisplayName, username, password){
  

  if( 
      username.trim() === demoUsername &&
      password.trim()===demoPassword){
      setIsAuthenticated(true)
      setDisplayName(enteredDisplayName.trim())

     return true
  }
  return false
}
    
  return (
    <AuthContext.Provider
        value={{isAuthenticated, displayName, login}}>
            {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  const context = useContext(AuthContext)

    if(!context){
      throw new Error ("UseeAuth Must be used inside AuthProvider")
    }
    return context
}

export default AuthProvider
