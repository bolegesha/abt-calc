// src/utils/auth.ts
import Cookies from 'js-cookie'

export const isAuthenticated = () => {
  return !!Cookies.get('token')
}

export const getToken = () => {
  return Cookies.get('token')
}

export const setToken = (token: string) => {
  Cookies.set('token', token, { expires: 7 }) // expires in 7 days
}

export const removeToken = () => {
  Cookies.remove('token')
}

export const setUser = (user: any) => {
  Cookies.set('user', JSON.stringify(user), { expires: 7 })
}

export const getUser = () => {
  const user = Cookies.get('user')
  return user ? JSON.parse(user) : null
}

export const removeUser = () => {
  Cookies.remove('user')
}

export const logout = () => {
  removeToken()
  removeUser()
}