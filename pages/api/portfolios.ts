import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

// Create a connection pool to the PostgreSQL database
const pool = new Pool({
    user: process.env.DB_USER, // Replace with your database username
    host: process.env.DB_HOST, // Replace with your database host
    database: process.env.DB_NAME, // Replace with your database name
    password: process.env.DB_PASSWORD, // Replace with your database password
    port: Number(process.env.DB_PORT) || 5432, // Replace with your database port
});

// Define the type of row
type Item = {
    id: number;
    title: string;
    type: string;
    description: string;
    date: string;
    image: string;
    details: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        // Query the database to get data from the "items" table
        const result = await pool.query('SELECT * FROM items');

        // Map the database rows to the desired JSON format
        const data = result.rows.map((row: Item) => ({
            id: row.id,
            type: row.type,
            title: row.title,
            description: row.description,
            date: row.date,
            image: row.image,
            details: row.details,
        }));

        // Return the data as JSON
        res.status(200).json(data);
    } catch (error: any) {
        console.error('Database query error:', error);
        res.status(500).json({ message: 'Error fetching data from the database', error: error.message });
    }
}