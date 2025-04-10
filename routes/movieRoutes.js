import express from 'express';
import { getAllMovies, addMovie } from '../controllers/movieController.js';

const router = express.Router();

router.get('/', getAllMovies);
router.post('/', addMovie); 

export default router;
