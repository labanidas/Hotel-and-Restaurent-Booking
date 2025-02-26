import express from "express";
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js'; 

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();
connectDB(); // Connect to MongoDB

const PORT = 5001;

// For ES module compatibility to handle __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the frontend 'dist' directory in production
if (process.env.NODE_ENV === "production") {
    console.log("Serving static files from production build");

    const frontendPath = path.join(__dirname, "../../frontend/dist");
    console.log(`Static files served from ${frontendPath}`);
    app.use(express.static(frontendPath));

    app.get("*", (req, res) => {
        const indexPath = path.join(frontendPath, "index.html");
        console.log(`Serving index.html from ${indexPath}`);
        res.sendFile(indexPath);
    });
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
