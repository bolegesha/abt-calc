'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useUserData } from '@/hooks/UserData'
import { Sidebar } from '@/components/SideBar'
import { UserCircle, Settings, Bell, HelpCircle } from 'lucide-react'


export default function ProfilePage() {
    const { user, token, loading, logout } = useUserData()
    const router = useRouter()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [activeSection, setActiveSection] = useState('profile')

    const sidebarItems = [
        { icon: UserCircle, label: 'Profile', href: '#profile' },
        { icon: Settings, label: 'Settings', href: '#settings' },
        { icon: Bell, label: 'Notifications', href: '#notifications' },
        { icon: HelpCircle, label: 'Help', href: '#help' },
    ]

    const handleSidebarItemClick = (sectionId: string) => {
        setActiveSection(sectionId)
    }

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth')
        }
    }, [user, loading, router])

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user || !token) {
        return null
    }

    return (
        <div className="flex min-h-screen">
            {/* Left section with Sidebar */}
            <Sidebar
                items={sidebarItems}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                onItemClick={handleSidebarItemClick}
            />

            {/* Right section with white background and content */}
            <main className="flex-1 bg-white">
                <div className="max-w-4xl w-full mx-auto p-8">
                    {activeSection === 'profile' && (
                        <div className="space-y-4">
                            <h1 className="text-2xl font-semibold text-[#1D1D1F]">User Profile</h1>
                            <div>
                                <label className="block text-sm font-medium text-[#86868B]">Full Name</label>
                                <p className="mt-1 text-lg text-[#1D1D1F]">{user.fullName}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#86868B]">Email</label>
                                <p className="mt-1 text-lg text-[#1D1D1F]">{user.email}</p>
                            </div>
                            <Button
                                onClick={logout}
                                className="mt-8 bg-[#0071E3] text-white py-2 px-4 rounded-lg hover:bg-[#0077ED] transition-colors"
                            >
                                Logout
                            </Button>
                        </div>
                    )}

                    {activeSection === 'notifications' && (
                        <div className="space-y-4">
                            <h1 className="text-2xl font-semibold text-[#1D1D1F]">Notifications</h1>
                            <div className="space-y-4">
                                <div className="p-4 rounded-lg border border-[#E5E5EA]">
                                    <p className="text-sm text-[#86868B]">Today</p>
                                    <p className="font-medium">New login from Chrome browser</p>
                                </div>
                                <div className="p-4 rounded-lg border border-[#E5E5EA]">
                                    <p className="text-sm text-[#86868B]">Yesterday</p>
                                    <p className="font-medium">Profile information updated</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'settings' && (
                        <div className="space-y-4">
                            <h1 className="text-2xl font-semibold text-[#1D1D1F]">Settings</h1>
                            {/* Add settings content */}
                        </div>
                    )}

                    {activeSection === 'help' && (
                        <div className="space-y-4">
                            <h1 className="text-2xl font-semibold text-[#1D1D1F]">Help & Support</h1>
                            {/* Add help content */}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}