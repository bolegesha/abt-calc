import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { userSchema, createUserSchema } from '@/schemas';
import { eq } from 'drizzle-orm';

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
        const validatedUser = createUserSchema.parse(body);

        const newUser = await db.insert(users).values({
            email: validatedUser.email,
            password: validatedUser.password,
        }).returning();
        return NextResponse.json(newUser[0], { status: 201 });
    } catch (error) {
        console.error('Failed to create user:', error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 400 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const validatedUser = userSchema.parse(body);

        if (!validatedUser.id) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const updatedUser = await db.update(users)
            .set({
                email: validatedUser.email,
                password: validatedUser.password,
            })
            .where(eq(users.id, validatedUser.id))
            .returning();

        if (updatedUser.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(updatedUser[0]);
    } catch (error) {
        console.error('Failed to update user:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 400 });
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { id } = body;
        if (!id || typeof id !== 'number') {
            return NextResponse.json({ error: 'Valid user ID is required' }, { status: 400 });
        }

        const deletedUser = await db.delete(users).where(eq(users.id, id)).returning();

        if (deletedUser.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Failed to delete user:', error);
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 400 });
    }
}