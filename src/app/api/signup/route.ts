// app/api/signup/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.email || !body.password || !body.name) {
            return NextResponse.json({
                message: 'Missing required fields',
                received: { email: !!body.email, password: !!body.password, name: !!body.name }
            }, { status: 400 });
        }

        try {
            const existingUsers = await db
                .select({
                    email: users.email
                })
                .from(users)
                .where(eq(users.email, body.email));


            if (existingUsers.length > 0) {
                return NextResponse.json({
                    message: 'Email already registered'
                }, { status: 400 });
            }

            const hashedPassword = await bcrypt.hash(body.password, SALT_ROUNDS);

            const newUserData = {
                email: body.email,
                password: hashedPassword,
                fullName: body.name,
                user_type: body.userType || 'user'
            };


            const [newUser] = await db
                .insert(users)
                .values(newUserData)
                .returning({
                    id: users.id,
                    email: users.email,
                    fullName: users.fullName,
                    user_type: users.user_type
                });


            const token = 'session_token_' + Math.random().toString(36).substr(2, 9);

            const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict' as const,
                maxAge: 10800,
                path: '/',
            };

            const response = NextResponse.json({
                user: newUser,
                token
            });

            response.cookies.set('token', token, cookieOptions);
            response.cookies.set('userData', JSON.stringify(newUser), cookieOptions);

            return response;

        } catch (dbError) {
            console.error('Database error:', dbError);
            return NextResponse.json({
                message: 'Database error',
                details: dbError instanceof Error ? dbError.message : 'Unknown database error'
            }, { status: 500 });
        }

    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({
            message: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}