import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  // Here you would typically verify the credentials with your authentication service
  // For now, we'll just create a user based on the provided email
  const user = {
    id: '1',
    fullName: email.split('@')[0], // Using the part before @ as the full name
    email: email
  }

  const token = 'mock_token_' + Math.random().toString(36).substr(2, 9)

  // Set the token in a cookie
  cookies().set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600, // 1 hour
    path: '/',
  })

  // Store user data in a cookie (not recommended for production, use a server-side session store instead)
  cookies().set('userData', JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600, // 1 hour
    path: '/',
  })

  return NextResponse.json({ user, token })
}
