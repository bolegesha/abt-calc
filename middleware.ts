// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Get the token from cookies
    const token = request.cookies.get('token')

    // Get the path the user is trying to access
    const path = request.nextUrl.pathname

    // Define protected routes (routes that require authentication)
    const protectedRoutes = ['/profile']
    // Define auth routes (login/signup pages)
    const authRoutes = ['/auth']

    // If user has a token (is logged in)
    if (token) {
        // If they try to access auth pages, redirect to home
        if (authRoutes.includes(path)) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    } else {
        // If user is not logged in and tries to access protected routes
        if (protectedRoutes.includes(path)) {
            return NextResponse.redirect(new URL('/auth', request.url))
        }
    }

    // Allow the request to continue
    return NextResponse.next()
}

// Configure which routes middleware will run on
export const config = {
    matcher: [
        '/auth',
        '/profile',
        // Add other protected routes here
    ]
}