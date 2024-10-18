import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  const userDataCookie = cookieStore.get('userData')

  if (!token || !userDataCookie) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const user = JSON.parse(userDataCookie.value)
    return NextResponse.json({ user, token: token.value })
  } catch (error) {
    console.error('Error parsing user data:', error)
    return NextResponse.json({ error: 'Invalid user data' }, { status: 500 })
  }
}
