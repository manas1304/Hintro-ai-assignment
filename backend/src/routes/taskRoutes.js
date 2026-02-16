import express from 'express';
import {createTask, updateTaskPosition} from '../controllers/taskController.js';
import {protect} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createTask);
router.put('/move', protect, updateTaskPosition);

export default router;