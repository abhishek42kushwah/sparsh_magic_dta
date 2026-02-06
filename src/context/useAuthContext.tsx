import type { UserType } from '@/types/auth'
import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next'
import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ChildrenType } from '../types/component-props'

export type AuthContextType = {
  user: UserType | undefined
  isAuthenticated: boolean
  saveSession: (session: UserType) => void
  removeSession: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

const authSessionKey = '_RIZZ_AUTH_KEY_'

export function AuthProvider({ children }: ChildrenType) {
  const navigate = useNavigate()

  
  const getSession = (): UserType | undefined => {
    const fetchedCookie = getCookie(authSessionKey)?.toString()
    if (!fetchedCookie) return undefined
    try {
      return JSON.parse(fetchedCookie)
    } catch {
      return undefined
    }
  }

  const [user, setUser] = useState<UserType | undefined>(getSession())

   console.log('AuthProvider user:', user)
  const saveSession = (user: UserType) => {
    setCookie(authSessionKey, JSON.stringify(user))
    setUser(user)
  }

  
  const removeSession = () => {
    deleteCookie(authSessionKey)
    setUser(undefined)
    navigate('/auth/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: hasCookie(authSessionKey),
        saveSession,
        removeSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
