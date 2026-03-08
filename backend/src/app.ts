import express from "express";
import cors from "cors";
import {Pool} from "pg";

export const app = express();

app.use(express.json());
app.use(cors())

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

app.get('/health', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({
            status: 'ok',
            database: 'Connected',
            serverTime: result.rows[0].now
        });
    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).json({
            status: 'error',
            message: err instanceof Error ? err.message : 'Unknown error'
        });
    }
});

app.get('/', (req, res) => {
    res.send('Backend is running!');
});
