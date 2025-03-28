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

// Define the type of input data
type Item = {
    title: string;
    type: string;
    description: string;
    date: string;
    image: string;
    details: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        // Parse the JSON input from the request body
        const { title, type, description, date, image, details }: Item = req.body;

        // Validate the input
        if (!title || !type || !description || !date || !image || !details) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Insert the data into the "items" table
        const query = `
            INSERT INTO items (title, type, description, date, image, details)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const values = [title, type, description, date, image, details];

        await pool.query(query, values);

        // Return a success response
        res.status(201).json({ message: 'Item inserted successfully' });
    } catch (error: any) {
        console.error('Database insert error:', error);
        res.status(500).json({ message: 'Error inserting data into the database', error: error.message });
    }
}