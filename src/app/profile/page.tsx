'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useUserData } from '@/hooks/UserData'
import { Sidebar } from '@/components/SideBar'
import { UserCircle, Settings, Bell, HelpCircle, House } from 'lucide-react'

export default function BasicProfilePage() {
    const { user, token, loading, logout } = useUserData()
    const router = useRouter()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [activeSection, setActiveSection] = useState('profile')

    const sidebarItems = [
        { icon: House, label: 'Главная страница', href: 'http://localhost:3000/' },
        { icon: UserCircle, label: 'Личный кабинет', href: '#profile' },
        { icon: Settings, label: 'Настройки', href: '#settings' },
        { icon: Bell, label: 'Уведолмения', href: '#notifications' },
        { icon: HelpCircle, label: 'Помогите', href: '#help' },
    ]

    const handleSidebarItemClick = (sectionId: string) => {
        setActiveSection(sectionId)
    }

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth')
        }
        if (user && user.user_type !== 'user') {
            router.push('/worker-profile')
        }
    }, [user, loading, router])

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user || !token || user.user_type !== 'user') {
        return null
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar
                items={sidebarItems}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                onItemClick={handleSidebarItemClick}
            />

            <main className="flex-1 bg-white">
                <div className="max-w-4xl w-full mx-auto p-8">
                    {activeSection === 'profile' && (
                        <div className="space-y-4">
                            <h1 className="text-2xl font-semibold text-[#1D1D1F]">Личный кабинет</h1>
                            <div>
                                <label className="block text-sm font-medium text-[#86868B]">Имя пользователя</label>
                                <p className="mt-1 text-lg text-[#1D1D1F]">{user.fullName}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#86868B]">Email</label>
                                <p className="mt-1 text-lg text-[#1D1D1F]">{user.email}</p>
                            </div>
                            <Button
                                onClick={logout}
                                className="mt-8 bg-[#D1350F] text-white py-2 px-4 rounded-lg hover:bg-red-400 transition-colors"
                            >
                                Выйти
                            </Button>
                        </div>
                    )}

                    {activeSection === 'notifications' && (
                        <div className="space-y-4">
                            <h1 className="text-2xl font-semibold text-[#1D1D1F]">Уведомления</h1>
                            <div className="space-y-4">
                                <div className="p-4 rounded-lg border border-[#E5E5EA]">
                                    <p className="text-sm text-[#86868B]">Today</p>
                                    <p className="font-medium">New login from Chrome browser</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'settings' && (
                        <div className="space-y-4">
                            <h1 className="text-2xl font-semibold text-[#1D1D1F]">Настройки</h1>

                        </div>
                    )}

                    {activeSection === 'help' && (
                        <div className="space-y-4">
                            <h1 className="text-2xl font-semibold text-[#1D1D1F]">Помогите</h1>

                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}