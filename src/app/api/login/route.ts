import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  // Here you would typically verify the credentials with your authentication service
  // For now, we'll just return a mock user and token
  const user = {
    id: '1',
    fullName: 'John Doe',
    email: email
  }

  const token = 'mock_token_' + Math.random().toString(36).substr(2, 9)

  return NextResponse.json({ user, token })
}
