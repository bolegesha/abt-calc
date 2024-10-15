'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function NavBar() {
  const router = useRouter()

  const handleLogout = () => {
    
    router.push('/auth')
  }

  return (
    <nav className="absolute top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
            </Link>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                Главная страница
              </Link>
              <Link href="/calculator" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                Расчет стоимость 
              </Link>
              <Link href="/about" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                О нас
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link href="/profile" className="bg-[#0071E3] text-white px-4 py-2 rounded-full hover:bg-[#0077ED] transition-colors text-sm font-medium">
              Профиль
            </Link>
            <button
              onClick={handleLogout}
              className="ml-4 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
            >
              Выйти 
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
