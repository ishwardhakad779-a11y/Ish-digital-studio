import { createContext, useContext, useEffect, useState } from 'react'
import apiClient from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('ish_admin_token')
    if (!token) {
      setLoading(false)
      return
    }
    apiClient
      .get('/auth/me')
      .then((res) => setUser(res.data))
      .catch(() => localStorage.removeItem('ish_admin_token'))
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const res = await apiClient.post('/auth/login', { email, password })
    localStorage.setItem('ish_admin_token', res.data.access_token)
    const me = await apiClient.get('/auth/me')
    setUser(me.data)
    return me.data
  }

  const logout = () => {
    localStorage.removeItem('ish_admin_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
