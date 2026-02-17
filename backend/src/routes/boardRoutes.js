import express from 'express';
import {createBoard, getAllBoards, getBoardById, addMemberToBoard} from '../controllers/boardController.js';
import {protect} from '../middlewares/authMiddleware.js';

const router = express.Router();

// Both routes now require a valid Json Web Token (JWT)
router.post('/', protect, createBoard);
router.get('/', protect, getAllBoards);
router.get('/:id', protect, getBoardById);
router.post('/add-member', protect, addMemberToBoard)

export default router;