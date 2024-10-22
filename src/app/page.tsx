'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserData } from '@/hooks/UserData'

export default function Home() {
    const { user, loading, error, checkSession } = useUserData()
    const router = useRouter()
    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            const isAuthenticated = await checkSession()
            if (!isAuthenticated) {
                router.replace('/auth')
            } else {
                setIsChecking(false)
            }
        }

        checkAuth()
    }, [checkSession, router])

    if (loading || isChecking) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }


    return (
      <div className="flex flex-col md:flex-row h-screen bg-[#F5F5F7] justify-center items-center">
        <h1 className="text-3xl font-bold">Welcome to Our Application, {user?.fullName}!</h1>
        <button
            onClick={() => {
              router.push('/profile')
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          profile
        </button>
      </div>
  )
}