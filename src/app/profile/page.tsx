'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useUserData } from '@/hooks/UserData'
import { Sidebar } from '@/components/SideBar'
import { UserCircle, Settings, Bell, HelpCircle, House, Moon, Volume2, Globe, Key } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {Label} from "@/components/ui/label";

export default function BasicProfilePage() {
    const { user, token, loading, logout } = useUserData()
    const router = useRouter()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [activeSection, setActiveSection] = useState('profile')

    const sidebarItems = [
        { icon: House, label: 'Главная страница', href: 'http://localhost:3000/' },
        { icon: UserCircle, label: 'Личный кабинет', href: '#profile' },
        { icon: Settings, label: 'Настройки', href: '#settings' },
        { icon: Bell, label: 'Заказы', href: '#orders' },
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
        return <div className="flex items-center justify-center h-screen text-[#00358E]">Loading...</div>
    }

    if (!user || !token || user.user_type !== 'user') {
        return null
    }

    const orders = [
        { id: '1', date: '2024-10-25', status: 'Доставлено', total: '56.999' },
        { id: '2', date: '2024-10-24', status: 'В пути', total: '35.499' },
        { id: '3', date: '2024-10-23', status: 'Обработка', total: '18.999' },
        { id: '4', date: '2024-10-22', status: 'Доставлено', total: '22.199' },
        { id: '5', date: '2024-10-21', status: 'Отменено', total: '41.599' },
    ]

    return (
        <div className="flex min-h-screen bg-[#F5F5F7]">
            <Sidebar
                items={sidebarItems}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                onItemClick={handleSidebarItemClick}
            />

            <main className="flex-1 p-8">
                <div className="max-w-3xl mx-auto">
                    {activeSection === 'profile' && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-gray-700">Профиль</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium text-[#86868B]">Имя пользователя</Label>
                                    <p className="mt-1 text-lg text-gray-700">{user.fullName}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-[#86868B]">Email</Label>
                                    <p className="mt-1 text-lg text-gray-700">{user.email}</p>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    onClick={logout}
                                    className="bg-[#D1350F] text-white py-2 px-4 rounded-lg hover:bg-red-400 transition-colors"
                                >
                                    Выйти
                                </Button>
                            </CardFooter>
                        </Card>
                    )}

                    {activeSection === 'orders' && (
                        <div className="space-y-12">

                            <div className="space-y-6">
                                <h2 className="text-3xl font-semibold text-[#00358E]">Недавние заказы</h2>
                                <Card className="bg-white shadow-sm border-none rounded-3xl overflow-hidden">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-white border-b border-white/10">
                                                <TableHead className="text-[#00358E] font-semibold text-lg py-4">ID заказа</TableHead>
                                                <TableHead className="text-[#00358E] font-semibold text-lg py-4">Дата</TableHead>
                                                <TableHead className="text-[#00358E] font-semibold text-lg py-4">Статус</TableHead>
                                                <TableHead className="text-[#00358E] font-semibold text-lg py-4 text-right">Сумма</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {orders.map((order) => (
                                                <TableRow key={order.id} className="border-b border-[#00358E]/10 last:border-b-0 hover:bg-[#F0F4FF] transition-colors">
                                                    <TableCell className="font-medium text-[#00358E] text-lg py-4">{order.id}</TableCell>
                                                    <TableCell className="text-[#00358E] text-lg py-4">{order.date}</TableCell>
                                                    <TableCell className="py-4">
                                                        <span className={`px-3 py-2 rounded-full text-sm font-semibold ${
                                                            order.status === 'Доставлено' ? 'bg-green-400 text-white' :
                                                                order.status === 'В пути' ? 'bg-blue-400 text-white' :
                                                                    order.status === 'Обработка' ? 'bg-yellow-400 text-white' :
                                                                        'bg-red-400 text-white'
                                                        }`}>
                                                            {order.status}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-right text-[#00358E] text-lg py-4">{order.total} тенге</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Card>
                            </div>
                        </div>
                    )}

                    {activeSection === 'settings' && (
                        <div className="space-y-8">
                            <h1 className="text-4xl font-semibold text-gray-700">Настройки</h1>
                            <Card className="bg-white shadow-sm border-none rounded-2xl">
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-center justify-between py-2 border-b border-[#00358E]/10">
                                        <div className="flex items-center space-x-3">
                                            <Moon className="text-[#00358E]" />
                                            <span className="text-gray-700 font-medium">Темный режим</span>
                                        </div>
                                        <Switch />
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-[#00358E]/10">
                                        <div className="flex items-center space-x-3">
                                            <Volume2 className="text-[#00358E]" />
                                            <span className="text-gray-700 font-medium">Звуковые уведомления</span>
                                        </div>
                                        <Switch />
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-[#00358E]/10">
                                        <div className="flex items-center space-x-3">
                                            <Globe className="text-[#00358E]" />
                                            <span className="text-gray-700 font-medium">Язык</span>
                                        </div>
                                        <Select defaultValue="ru">
                                            <SelectTrigger className="w-[120px] border-none text-[#00358E]">
                                                <SelectValue placeholder="Выберите язык" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ru">Русский</SelectItem>
                                                <SelectItem value="en">English</SelectItem>
                                                <SelectItem value="es">Қазақ</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Button variant="outline" className="w-full mt-4 border-[#00358E] text-gray-700 hover:bg-[#00358E] hover:text-white">
                                        <Key className="mr-2 h-4 w-4" /> Изменить пароль
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeSection === 'help' && (
                        <div className="space-y-8">
                            <h1 className="text-4xl font-semibold text-[#00358E]">Помогите</h1>
                            <Card className="bg-white shadow-sm border-none rounded-2xl">
                                <CardContent className="p-8 space-y-4">
                                    <Accordion type="single" collapsible className="space-y-2">
                                        <AccordionItem value="item-1" className="border-b border-[#00358E]/10">
                                            <AccordionTrigger className="text-[#00358E] hover:no-underline">
                                                <span>Как изменить мой профиль?</span>
                                            </AccordionTrigger>
                                            <AccordionContent className="text-[#8E8E93]">
                                                Чтобы изменить информацию в вашем профиле, перейдите в раздел "Личный кабинет" и нажмите на кнопку "Редактировать профиль". Там вы сможете обновить ваше имя, email и другие данные.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-2" className="border-b border-[#00358E]/10">
                                            <AccordionTrigger className="text-[#00358E] hover:no-underline">
                                                <span>Как отследить мой заказ?</span>
                                            </AccordionTrigger>
                                            <AccordionContent className="text-[#8E8E93]">
                                                Для отслеживания заказа перейдите в раздел "Уведомления" и найдите ваш заказ в таблице "Недавние заказы". Статус заказа будет отображен в соответствующей колонке.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-3" className="border-b border-[#00358E]/10">
                                            <AccordionTrigger className="text-[#00358E] hover:no-underline">
                                                <span>Как изменить настройки уведомлений?</span>
                                            </AccordionTrigger>
                                            <AccordionContent className="text-[#8E8E93]">
                                                Настройки уведомлений можно изменить в разделе "Настройки". Там вы найдете опции для включения/выключения звуковых уведомлений и выбора типов уведомлений, которые вы хотите получать.
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </CardContent>
                            </Card>
                            <Card className="bg-white  shadow-sm border-none rounded-2xl">
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-[#00358E]">Нужна дополнительная помощь?</CardTitle>
                                    <CardDescription className="text-[#8E8E93]">Наша команда поддержки готова помочь вам</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button className="w-full bg-[#00358E] text-white py-3 px-4 rounded-full text-lg font-medium hover:bg-[#002266] transition-colors">
                                        Связаться с поддержкой
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}