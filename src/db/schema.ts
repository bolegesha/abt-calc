import { pgTable, serial, text, varchar} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    fullName: text('full_name'),
    password: varchar('password', { length: 255 }).notNull(),
});
