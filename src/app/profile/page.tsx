'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useUserData } from '@/hooks/UserData'

export default function ProfilePage() {
    const { user, token, loading, logout } = useUserData()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth')
        }
    }, [user, loading, router])

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user || !token) {
        return null // This case is handled by the useEffect hook
    }

    return (
        <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
                <h1 className="text-3xl font-semibold text-[#1D1D1F] mb-6 text-center">User Profile</h1>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#86868B]">Full Name</label>
                        <p className="mt-1 text-lg text-[#1D1D1F]">{user.fullName}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#86868B]">Email</label>
                        <p className="mt-1 text-lg text-[#1D1D1F]">{user.email}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#86868B]">Token</label>
                        <p className="mt-1 text-sm text-[#1D1D1F] break-all bg-gray-100 p-2 rounded">
                            {token}
                        </p>
                    </div>
                </div>
                <Button
                    onClick={logout}
                    className="w-full mt-8 bg-[#0071E3] text-white py-2 px-4 rounded-full text-lg font-medium hover:bg-[#0077ED] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:ring-opacity-50"
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}