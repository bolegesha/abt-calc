// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const userData = request.cookies.get('userData')?.value

    if (userData) {
        const user = JSON.parse(userData)

        // Redirect based on user type
        if (request.nextUrl.pathname === '/profile') {
            if (user.user_type === 'worker') {
                return NextResponse.redirect(new URL('/worker-profile', request.url))
            } else if (user.user_type === 'admin') {
                return NextResponse.redirect(new URL('/admin', request.url))
            }
        }

        // Protect admin routes
        if (request.nextUrl.pathname.startsWith('/admin') && user.user_type !== 'admin') {
            return NextResponse.redirect(new URL('/auth', request.url))
        }

        // Protect worker routes
        if (request.nextUrl.pathname.startsWith('/worker-profile') && user.user_type !== 'worker') {
            return NextResponse.redirect(new URL('/auth', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/profile', '/admin', '/worker-profile', '/auth']
}