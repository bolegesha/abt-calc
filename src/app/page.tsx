'use client'

import { useState, useRef, RefObject } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Home as HomeIcon, Package, Truck, User, Settings } from 'lucide-react'

interface SectionRefs {
    [key: string]: RefObject<HTMLElement>;
}

export default function Home() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const sectionsRef = useRef<SectionRefs>({
        home: useRef<HTMLElement>(null),
        orders: useRef<HTMLElement>(null),
        track: useRef<HTMLElement>(null),
        profile: useRef<HTMLElement>(null),
        settings: useRef<HTMLElement>(null),
    })

    const sidebarItems = [
        { icon: HomeIcon, label: 'Home', href: '#home' },
        { icon: Package, label: 'Orders', href: '#orders' },
        { icon: Truck, label: 'Track Delivery', href: '#track' },
        { icon: User, label: 'Profile', href: '#profile' },
        { icon: Settings, label: 'Settings', href: '#settings' },
    ]

    const scrollToSection = (sectionId: string) => {
        sectionsRef.current[sectionId]?.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="grid grid-cols-[auto,1fr] h-screen bg-[#F5F5F7] overflow-hidden">
            <div className="h-full flex items-center">
                <Sidebar
                    items={sidebarItems}
                    isCollapsed={isSidebarCollapsed}
                    setIsCollapsed={setIsSidebarCollapsed}
                    onItemClick={scrollToSection}
                />
            </div>
            <main className={`overflow-y-auto transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-[280px]'}`}>
                <div className="max-w-4xl mx-auto p-8">

                    <div className="grid gap-8">
                        <section ref={sectionsRef.current.home} id="home" className="min-h-screen flex items-center">
                            <h1 className="text-4xl font-bold">Welcome to our page</h1>
                        </section>
                        <section ref={sectionsRef.current.orders} id="orders"
                                 className="min-h-screen flex items-center">
                            <h2 className="text-3xl font-semibold">Orders</h2>
                        </section>
                        <section ref={sectionsRef.current.track} id="track" className="min-h-screen flex items-center">
                            <h2 className="text-3xl font-semibold">Track Delivery</h2>
                        </section>
                        <section ref={sectionsRef.current.profile} id="profile"
                                 className="min-h-screen flex items-center">
                            <h2 className="text-3xl font-semibold">Profile</h2>
                        </section>
                        <section ref={sectionsRef.current.settings} id="settings"
                                 className="min-h-screen flex items-center">
                            <h2 className="text-3xl font-semibold">Settings</h2>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}