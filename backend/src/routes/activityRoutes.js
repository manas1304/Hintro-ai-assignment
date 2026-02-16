import express from 'express';
import {getBoardActivity} from '../controllers/activityController.js';
import {protect} from '../middlewares/authMiddleware.js';

const router = express.Router();

// Only logged in users can see the history
router.get('/:boardId', protect, getBoardActivity)

export default router;