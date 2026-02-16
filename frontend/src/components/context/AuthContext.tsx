import { createContext, useContext, useState, useEffect } from "react"
import { Navigate } from "react-router-dom"

interface User {
  email: string,
  token: string
}

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // restore user on page reload
  useEffect(() => {
    if(!user){
      return
    }
    setUser({email: user.email, token: user.token})
  }, [])

  function logout() {
    <Navigate to={"/login"}/>
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used inside AuthProvider")
  return context
}
