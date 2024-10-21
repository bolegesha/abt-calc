import { z } from 'zod';

export const userSchema = z.object({
    id: z.number().optional(),
    email: z.string().email(),
    password: z.string().min(6),
});

export const createUserSchema = userSchema.omit({ id: true });

export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;