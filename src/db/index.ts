// db/index.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
    ssl: {
        rejectUnauthorized: true,
    },
});

// const testConnection = async () => {
//     let client;
//     try {
//         client = await pool.connect();
//         const result = await client.query('SELECT NOW()');
//     } catch (err) {
//         console.error('Error connecting to database:', err);
//         throw err;
//     } finally {
//         if (client) {
//             client.release();
//         }
//     }
// };


export const db = drizzle(pool, { schema });