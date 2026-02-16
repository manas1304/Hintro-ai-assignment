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

// Routes for boards
import boardRoutes from './src/routes/boardRoutes.js';
app.use('/api/boards', boardRoutes);

// Route for Tasks
import taskRoutes from './src/routes/taskRoutes.js';
app.use('/api/tasks', taskRoutes);

// Route for Lists
import listRoutes from './src/routes/listRoutes.js';
app.use('/api/lists', listRoutes);

// Route for Activites
import activityRoutes from './src/routes/activityRoutes.js';
app.use('/api/activity', activityRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Serving running in developement mode on port ${PORT}`)
})

