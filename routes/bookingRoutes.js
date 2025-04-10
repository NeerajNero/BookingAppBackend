import express from 'express';
import {
  bookTickets,
  getBookings,
  cancelBooking
} from '../controllers/bookingController.js';

import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, bookTickets);
router.get('/', authMiddleware, getBookings);
router.delete('/:id', authMiddleware, cancelBooking);

export default router;
