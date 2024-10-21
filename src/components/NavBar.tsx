'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function NavBar() {
  return (
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex-shrink-0">
                LOGO
              </Link>
              <Link href="/" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                Главная страница
              </Link>
              <Link href="/calculator" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                Калькулятор стоимости доставки
              </Link>
              <Link href="/about" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                О нас
              </Link>
            </div>
          </div>
        </div>
      </nav>
  )
}