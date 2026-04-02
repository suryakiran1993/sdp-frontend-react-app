/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const normalizeRole = (value) => {
  if (!value) {
    return null
  }

  const normalizedValue = value.toString().trim().toUpperCase()

  if (normalizedValue === 'ADMIN') {
    return 'admin'
  }

  if (normalizedValue === 'CUSTOMER') {
    return 'customer'
  }

  if (normalizedValue === 'MANAGER' || normalizedValue === 'SERVICE_MANAGER' || normalizedValue === 'SERVICEMANAGER') {
    return 'servicemanager'
  }

  return value.toString().trim().toLowerCase()
}

const getInitialAuthState = () => ({
  token: sessionStorage.getItem('token'),
  role: normalizeRole(sessionStorage.getItem('loggedInRole') || sessionStorage.getItem('role')),
})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getInitialAuthState)

  const login = ({ token, role: nextRole }) => {
    const normalizedRole = normalizeRole(nextRole)

    if (token) {
      sessionStorage.setItem('token', token)
    } else {
      sessionStorage.removeItem('token')
    }

    if (nextRole) {
      sessionStorage.setItem('role', nextRole)
      sessionStorage.setItem('loggedInRole', normalizedRole)
    } else {
      sessionStorage.removeItem('role')
      sessionStorage.removeItem('loggedInRole')
    }

    setAuth({
      token: token || null,
      role: normalizedRole,
    })
  }

  const loginAs = (nextRole) => {
    const normalizedRole = normalizeRole(nextRole)

    sessionStorage.setItem('loggedInRole', normalizedRole)
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('role')

    setAuth({
      token: null,
      role: normalizedRole,
    })
  }

  const logout = () => {
    const currentRole = auth.role || normalizeRole(sessionStorage.getItem('loggedInRole') || sessionStorage.getItem('role'))

    if (currentRole === 'customer') {
      sessionStorage.removeItem('loggedInCustomer')
    } else if (currentRole === 'admin') {
      sessionStorage.removeItem('loggedInAdmin')
    } else if (currentRole === 'servicemanager') {
      sessionStorage.removeItem('loggedInServiceManager')
    }

    sessionStorage.removeItem('token')
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('loggedInRole')
    setAuth({
      token: null,
      role: null,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        token: auth.token,
        role: auth.role,
        isAuthenticated: Boolean(auth.token || auth.role),
        login,
        loginAs,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
