import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  const user = {
    id: '1',
    fullName: email.split('@')[0], 
    email: email
  }

  const token = 'mock_token_' + Math.random().toString(36).substr(2, 9)

  cookies().set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 10800, // 1 hour
    path: '/',
  })

  cookies().set('userData', JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 10800, // 1 hour
    path: '/',
  })

  return NextResponse.json({ user, token })
}
