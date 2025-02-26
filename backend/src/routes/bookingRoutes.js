// routes/bookingRoutes.js

import express from 'express';
import {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking
} from '../controllers/bookingController.js';
import { protectedRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new booking
router.post('/', protectedRoute, createBooking);

// Retrieve all bookings
router.get('/', protectedRoute, getAllBookings);

// Retrieve a specific booking by ID
router.get('/:id', protectedRoute, getBookingById);

// Update a booking
router.put('/:id', protectedRoute, updateBooking);

// Delete a booking
router.delete('/:id', protectedRoute, deleteBooking);

export default router;
