import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/sequelize';

dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection 
connectDB()

// Default route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});