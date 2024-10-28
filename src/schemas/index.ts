import { z } from 'zod';

export const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    fullName: z.string().optional(),
    user_type: z.enum(['user', 'worker']).default('user')
});

export const userSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    password: z.string(),
    fullName: z.string().optional(),
    user_type: z.enum(['user', 'worker'])
});