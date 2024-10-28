// app/api/login/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()

        // Simple validation
        if (!email || !password) {
            return NextResponse.json({ message: 'Missing email or password' }, { status: 400 })
        }

        // Find user in the database
        const [user] = await db.select().from(users).where(eq(users.email, email))

        if (!user) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
        }

        // Create a session token
        const token = 'session_token_' + Math.random().toString(36).substr(2, 9)

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict' as const,
            maxAge: 10800, // 3 hours
            path: '/',
        }

        // Don't include password in the response
        const { password: _, ...userWithoutPassword } = user;

        const response = NextResponse.json({
            user: userWithoutPassword,
            token
        })

        response.cookies.set('token', token, cookieOptions)
        response.cookies.set('userData', JSON.stringify(userWithoutPassword), cookieOptions)

        return response

    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json({ message: 'Error logging in' }, { status: 500 })
    }
}