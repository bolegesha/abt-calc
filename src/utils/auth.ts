// src/utils/auth.ts

const isBrowser = typeof window !== 'undefined'

export const isAuthenticated = () => {
  if (!isBrowser) return false
  return !!localStorage.getItem('token')
}

export const getToken = () => {
  if (!isBrowser) return null
  return localStorage.getItem('token')
}

export const setToken = (token: string) => {
  if (isBrowser) localStorage.setItem('token', token)
}

export const removeToken = () => {
  if (isBrowser) localStorage.removeItem('token')
}

export const setUser = (user: any) => {
  if (isBrowser) localStorage.setItem('user', JSON.stringify(user))
}

export const getUser = () => {
  if (!isBrowser) return null
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const removeUser = () => {
  if (isBrowser) localStorage.removeItem('user')
}

export const logout = () => {
  removeToken()
  removeUser()
}