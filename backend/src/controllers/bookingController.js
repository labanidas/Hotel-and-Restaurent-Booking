// controllers/bookingController.js

import Booking from '../models/Booking.js';

// Create a new Booking
export const createBooking = async (req, res) => {
  
    const { _id: customer } = req.user;
    const { listing, unit, bookingDates, status, paymentDetails } = req.body;
    try {
        const newBooking = new Booking({
            customer,
            listing,
            unit,
            bookingDates,
            status,
            paymentDetails
        });
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all Bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('customer listing unit');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single Booking by ID
export const getBookingById = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.findById(id).populate('customer listing unit');
        if (booking) {
            res.status(200).json(booking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Booking
export const updateBooking = async (req, res) => {
    const { id } = req.params;
    const { bookingDates, status, paymentDetails } = req.body;
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(id, {
            bookingDates,
            status,
            paymentDetails
        }, { new: true });
        if (updatedBooking) {
            res.status(200).json(updatedBooking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Booking
export const deleteBooking = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.findByIdAndDelete(id);
        if (booking) {
            res.status(200).json({ message: 'Booking deleted successfully' });
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
