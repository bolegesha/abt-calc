import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()

        // Simple validation
        if (!email || !password) {
            return NextResponse.json({ message: 'Missing email or password' }, { status: 400 })
        }

        const user = {
            id: '1',
            fullName: email.split('@')[0],
            email: email
        }

        const token = 'mock_token_' + Math.random().toString(36).substr(2, 9)

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict' as const,
            maxAge: 32400,
            path: '/',
        }

        cookies().set('token', token, cookieOptions)
        cookies().set('userData', JSON.stringify(user), cookieOptions)

        return NextResponse.json({ user, token })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json({ message: 'Error logging in' }, { status: 500 })
    }
}