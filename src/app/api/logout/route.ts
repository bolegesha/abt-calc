import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  cookies().delete('token')
  cookies().delete('userData')
  return NextResponse.json({ message: 'Logged out successfully' })
}
