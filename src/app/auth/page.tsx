'use client'

import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { isAuthenticated, setToken, setUser } from '@/utils/auth'

const InteractiveMap = dynamic(() => import('../../components/InteractiveMap'), {
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center bg-gray-200">Loading map...</div>
})

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/')
    }
  }, [router])

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
    setError(null)
  }

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup'
      const body = isLogin ? { email, password } : { email, password, fullName: name }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed')
      }

      if (isLogin) {
        setToken(data.token)
        setUser(data.user)
        console.log('Login successful, redirecting...')
        router.push('/')
      } else {
        console.log('Signed up successfully')
        setIsLogin(true) // Switch to login mode after successful signup
      }
    } catch (error) {
      console.error('Auth error:', error)
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isAuthenticated()) {
    return null // or a loading indicator
  }


  return (
      <div className="flex flex-col md:flex-row h-screen bg-[#F5F5F7]">
        <div className="md:w-3/5 h-1/3 md:h-full">
          <InteractiveMap />
        </div>

        <div className="md:w-2/5 p-8 flex flex-col justify-center h-2/3 md:h-full overflow-y-auto">
          <div className="max-w-lg w-full mx-auto space-y-10">
            <div>
              <h2 className="text-4xl font-semibold text-[#1D1D1F] text-center mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-center text-[#86868B] text-lg">
                {isLogin
                    ? 'Sign in to your account'
                    : 'Sign up for a new account'}
              </p>
            </div>

            {error && (
                <div className="bg-[#FFF0F0] text-[#FF3B30] p-4 rounded-xl text-center" role="alert">
                  <span className="font-medium">{error}</span>
                </div>
            )}

            <form onSubmit={handleAuth} className="space-y-8">
              {!isLogin && (
                  <div>
                    <Label htmlFor="name" className="text-[#1D1D1F] text-sm font-medium">
                      Full Name
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        className="mt-1 w-full px-4 py-4 bg-white border border-[#D1D1D6] rounded-xl focus:ring-2 focus:ring-[#0071E3] focus:border-transparent transition-colors text-lg"
                        placeholder="Enter your full name"
                    />
                  </div>
              )}
              <div>
                <Label htmlFor="email-address" className="text-[#1D1D1F] text-sm font-medium">
                  Email Address
                </Label>
                <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 w-full px-4 py-4 bg-white border border-[#D1D1D6] rounded-xl focus:ring-2 focus:ring-[#0071E3] focus:border-transparent transition-colors text-lg"
                    placeholder="Enter your email address"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-[#1D1D1F] text-sm font-medium">
                  Password
                </Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    required
                    className="mt-1 w-full px-4 py-4 bg-white border border-[#D1D1D6] rounded-xl focus:ring-2 focus:ring-[#0071E3] focus:border-transparent transition-colors text-lg"
                    placeholder="Enter your password"
                />
              </div>

              <Button
                  type="submit"
                  className="w-full bg-[#0071E3] text-white py-4 px-6 rounded-full text-lg font-medium hover:bg-[#0077ED] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:ring-opacity-50"
                  disabled={isLoading}
              >
                {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </Button>
            </form>

            <div className="text-center">
              <Button
                  onClick={toggleAuthMode}
                  variant="link"
                  className="text-[#0071E3] hover:text-[#0077ED] text-lg"
              >
                {isLogin ? 'Create a new account' : 'Already have an account? Sign in'}
              </Button>
            </div>
          </div>
        </div>
      </div>
  )
}