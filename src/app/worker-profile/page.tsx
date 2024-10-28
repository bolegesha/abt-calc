'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useUserData } from '@/hooks/UserData'
import { Sidebar } from '@/components/SideBar'
import { UserCircle, Settings, Calculator, HelpCircle, Trello, ChartBarIncreasing } from 'lucide-react'
import WCalculator from '@/components/Calculator'

export default function WorkerProfilePage() {
    const { user, token, loading, logout } = useUserData()
    const router = useRouter()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [activeSection, setActiveSection] = useState('profile')

    const sidebarItems = [
        { icon: UserCircle, label: 'Профиль', href: '#profile' },
        { icon: Trello, label: 'Документы', href: '#docs' },
        { icon: ChartBarIncreasing, label: 'Активные заказы', href: '#orders' },
        { icon: Settings, label: 'Настройки', href: '#settings' },
        { icon: Calculator, label: 'Калькулятор', href: '#calculator' },
        { icon: HelpCircle, label: 'Помогите', href: '#help' }
    ]

    const handleSidebarItemClick = (sectionId: string) => {
        setActiveSection(sectionId)
    }

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth')
        }
        if (user && user.user_type !== 'worker') {
            router.push('/profile')
        }
    }, [user, loading, router])

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user || !token || user.user_type !== 'worker') {
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
                            <h1 className="text-2xl font-semibold text-[#1D1D1F]">Профиль</h1>
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
                                Logout
                            </Button>
                        </div>
                    )}

                    {activeSection === 'docs' && (
                        <div className="space-y-4">
                            <h1 className="text-2xl font-semibold text-[#1D1D1F]">Документы</h1>
                            {/* Worker documents section */}
                        </div>
                    )}

                    {activeSection === 'orders' && (
                        <div className="space-y-4">
                            <h1 className="text-2xl font-semibold text-[#1D1D1F]">Активные заказы</h1>
                            {/* Worker orders section */}
                        </div>
                    )}

                    {activeSection === 'calculator' && (
                        <div className="space-y-4">
                            <h1 className="text-2xl font-semibold text-[#1D1D1F]">Калькулятор стоимости</h1>
                            <div className="space-y-4">
                                <WCalculator/>
                            </div>
                        </div>
                    )}

                    {activeSection === 'settings' && (
                        <div className="space-y-4">
                            <h1 className="text-2xl font-semibold text-[#1D1D1F]">Настройки</h1>
                            {/* Worker specific settings */}
                        </div>
                    )}

                    {activeSection === 'help' && (
                        <div className="space-y-4">
                            <h1 className="text-2xl font-semibold text-[#1D1D1F]">Поддержка</h1>
                            {/* Worker specific help content */}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}