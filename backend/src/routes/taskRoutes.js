import express from 'express';
import {createTask, updateTaskPosition, getTasksByBoard, assignTask, deleteTask, updateTask} from '../controllers/taskController.js';
import {protect} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createTask);
router.put('/move', protect, updateTaskPosition);
router.get('/', protect, getTasksByBoard);
router.post('/:taskId/assign', protect, assignTask);
router.put('/:id', protect, updateTask); 
router.delete('/:id', protect, deleteTask);

export default router;