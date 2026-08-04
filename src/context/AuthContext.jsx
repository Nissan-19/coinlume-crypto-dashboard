import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

const demoUsername = "user"
const demoPassword = "1234"
                    
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

          setIsAuthenticated(true)
          setDisplayName(enteredDisplayName.trim())

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

    return (
      <AuthContext.Provider
          value={{isAuthenticated, displayName, authIsLoading, login, logout}}>   
              {children}
      </AuthContext.Provider>
  )
}

export function useAuth(){                    
  const context = useContext(AuthContext)    
    if(!context){                            
      throw new Error ("UseAuth Must be used inside AuthProvider")
    }
    return context
}

export default AuthProvider
