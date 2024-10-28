// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';  // Make sure to import eq
import bcrypt from 'bcrypt';

export async function GET() {
    try {
        const allUsers = await db.select().from(users);
        return NextResponse.json(allUsers);
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();


        // Validate required fields
        if (!body.email || !body.password || !body.name) {
            return NextResponse.json({
                message: 'Missing required fields'
            }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(body.password, 10);

        // Create the user
        const [newUser] = await db.insert(users).values({
            email: body.email,
            password: hashedPassword,
            fullName: body.name,
            user_type: body.user_type
        }).returning();

        // Remove password from response
        const { password: _, ...userWithoutPassword } = newUser;


        return NextResponse.json(userWithoutPassword, { status: 201 });
    } catch (error) {
        console.error('Failed to create user:', error);
        return NextResponse.json({
            message: 'Failed to create user',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json();

        if (!body.id) {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }

        // Fixed: Use eq for comparison
        await db.delete(users)
            .where(eq(users.id, body.id))
            .execute();

        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete user' }, { status: 500 });
    }
}