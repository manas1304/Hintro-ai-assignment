import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import {Server} from 'socket.io';
import http from 'http';


// Environment variables
dotenv.config();

// Database connection
connectDB();
const app = express();

//Middle wares
app.use(cors()); // Enabling the frontend is able to talk to the backend ( since they will be running on different ports)
app.use(express.json()); // Body parser for JSON data

const server = http.createServer(app); // This is required because socket.io needs to attach to HTTP server and not express directly
export const io = new Server(server, {
    cors:{
        origin: 'http://localhost:3000', // Frontend URL
        methods: ['GET', 'POST']
    }
});


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

// Listening for connections
io.on('connection', (socket) =>{
    console.log("A user connected", socket.id);

    // Join a specific board room so users get updates only for their boards
    socket.on('joinBoard', (boardId) =>{
        socket.join(boardId);
        console.log(`User joined board: ${boardId}`)
    })

    socket.on('disconnect', () =>{
        console.log('User disconnected');
    });
})

server.listen(PORT, () =>{
    console.log(`Serving running in developement mode on port ${PORT}`)
})

