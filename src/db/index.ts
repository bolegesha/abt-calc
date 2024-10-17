import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    ssl: {
        rejectUnauthorized: process.env.NODE_ENV === 'production',
    },
    connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);