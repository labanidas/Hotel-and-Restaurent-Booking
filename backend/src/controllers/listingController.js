// controllers/listingController.js

import Listing from '../models/Listing.js';

// Add a new listing
export const addListing = async (req, res) => {
    const { _id: vendor } = req.user;
    const { type, name, address, description, facilities, pricing, images } = req.body;
    try {
        const newListing = new Listing({
            vendor,
            type,
            name,
            address,
            description,
            facilities,
            pricing,
            images
        });
        await newListing.save();
        res.status(201).json(newListing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all listings
export const getAllListings = async (req, res) => {
    try {
        const listings = await Listing.find();
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single listing by ID
export const getListing = async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listing.findById(id);
        if (listing) {
            res.status(200).json(listing);
        } else {
            res.status(404).json({ message: 'Listing not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a listing
export const updateListing = async (req, res) => {
    const { id } = req.params;
    const { type, name, address, description, facilities, pricing, images } = req.body;
    try {
        const updatedListing = await Listing.findByIdAndUpdate(id, {
            type,
            name,
            address,
            description,
            facilities,
            pricing,
            images
        }, { new: true });  // Return the updated document
        if (updatedListing) {
            res.status(200).json(updatedListing);
        } else {
            res.status(404).json({ message: 'Listing not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a listing
export const deleteListing = async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listing.findByIdAndDelete(id);
        if (listing) {
            res.status(200).json({ message: 'Listing deleted successfully' });
        } else {
            res.status(404).json({ message: 'Listing not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
