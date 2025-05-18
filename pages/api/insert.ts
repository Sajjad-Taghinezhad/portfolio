import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import formidable, { File } from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable body parsing by Next.js (required for file uploads)
export const config = {
    api: {
        bodyParser: false,
    },
};

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
    details: string;
    image: string; // File path for the uploaded file
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const form = formidable({
        multiples: false, // Only allow a single file upload
        uploadDir: path.join(process.cwd(), 'public/uploads'), // Directory to store uploaded files
        keepExtensions: true, // Keep file extensions
        filter: (part) => {
            // Only accept image and PDF files
            const mimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            return mimeTypes.includes(part.mimetype || '');
        },
    });

    try {
        // Parse the form data
        const { fields, files } = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
            (resolve, reject) => {
                form.parse(req, (err, fields, files) => {
                    if (err) reject(err);
                    else resolve({ fields, files });
                });
            }
        );

        // Extract fields and file
        function getField(field: any) {
            if (Array.isArray(field)) return field[0];
            return field;
        }

        const title = getField(fields.title);
        const type = getField(fields.type);
        const description = getField(fields.description);
        const date = getField(fields.date);
        const details = getField(fields.details);
        let file = files.file as File | File[] | undefined;

        if (Array.isArray(file)) file = file[0];

        // Validate required fields and file
        if (!title || !type || !description || !date || !details || !file || !file.filepath) {
            return res.status(400).json({ message: 'Missing required fields or file' });
        }

        // Get the file path
        const filePath = `/uploads/${path.basename(file.filepath)}`;

        // Insert the data into the "items" table
        const query = `
            INSERT INTO items (title, type, description, date, image, details)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const values = [title, type, description, date, filePath, details];
        console.log('Inserting data into the database:', title, type, description, date, filePath, details);

        await pool.query(query, values);

        // Return a success response
        res.status(201).json({ message: 'Item inserted successfully', filePath });
    } catch (error: any) {
        console.error('Error handling file upload or database insert:', error);
        res.status(500).json({ message: 'Error inserting data into the database', error: error.message });
    }
}