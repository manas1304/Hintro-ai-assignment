import express from 'express';
import {createList, getListsByBoard} from '../controllers/listController.js';
import {protect} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createList);
router.get('/', protect, getListsByBoard);

export default router;