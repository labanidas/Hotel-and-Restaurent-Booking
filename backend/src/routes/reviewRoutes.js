// routes/reviewRoutes.js

import express from 'express';
import {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
} from '../controllers/reviewController.js';
import { protectedRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes for reviews
router.post('/', protectedRoute, createReview);  // Only logged-in users can create reviews
router.get('/', getAllReviews);
router.get('/:id', protectedRoute, getReviewById);  // Protecting individual review retrieval might depend on business rules
router.put('/:id', protectedRoute, updateReview);  // Users can update their reviews
router.delete('/:id', protectedRoute, deleteReview);  // Users can delete their reviews

export default router;
