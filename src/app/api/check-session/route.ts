import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // Here you would typically verify the token with your authentication service
  // For now, we'll just return a mock user
  const user = {
    id: '1',
    fullName: 'John Doe',
    email: 'john@example.com'
  }

  return NextResponse.json({ user, token: token.value })
}
