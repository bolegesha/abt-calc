import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const { email, hashedPassword, fullName } = await request.json();

  try {
    await sql`
      INSERT INTO users (email, password, full_name)
      VALUES (${email}, ${hashedPassword}, ${fullName})
    `;

    return NextResponse.json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'An error occurred during signup' }, { status: 500 });
  }
}
