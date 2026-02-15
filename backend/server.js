import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';

// Environment variables
dotenv.config();

// Database connection
connectDB();
const app = express();

//Middle wares
app.use(cors()); // Enabling the frontend is able to talk to the backend ( since they will be running on different ports)
app.use(express.json()); // Body parser for JSON data

// Route for authorization
import authRoutes from './src/routes/authRoutes.js';
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Serving running in developement mode on port ${PORT}`)
})