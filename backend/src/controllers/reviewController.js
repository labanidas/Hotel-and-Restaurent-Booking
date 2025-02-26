// controllers/reviewController.js

import Review from '../models/Review.js';

// Create a new Review
export const createReview = async (req, res) => {
    const { _id: customer } = req.user;
    const { booking, rating, comments } = req.body;
    try {
        const newReview = new Review({
            booking,
            customer,
            rating,
            comments
        });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all Reviews
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('booking customer');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single Review by ID
export const getReviewById = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findById(id).populate('booking customer');
        if (review) {
            res.status(200).json(review);
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Review
export const updateReview = async (req, res) => {
    const { id } = req.params;
    const { rating, comments } = req.body;
    try {
        const updatedReview = await Review.findByIdAndUpdate(id, {
            rating,
            comments
        }, { new: true });
        if (updatedReview) {
            res.status(200).json(updatedReview);
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Review
export const deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findByIdAndDelete(id);
        if (review) {
            res.status(200).json({ message: 'Review deleted successfully' });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
