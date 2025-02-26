// controllers/unitController.js

import Unit from '../models/Unit.js';

// Create a new Unit
export const createUnit = async (req, res) => {
    const { listing, type, capacity, price, availability } = req.body;
    try {
        const newUnit = new Unit({
            listing,
            type,
            capacity,
            price,
            availability
        });
        await newUnit.save();
        res.status(201).json(newUnit);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all Units
export const getAllUnits = async (req, res) => {
    try {
        const units = await Unit.find().populate('listing');
        res.status(200).json(units);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single Unit by ID
export const getUnitById = async (req, res) => {
    const { id } = req.params;
    try {
        const unit = await Unit.findById(id).populate('listing');
        if (unit) {
            res.status(200).json(unit);
        } else {
            res.status(404).json({ message: 'Unit not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Unit
export const updateUnit = async (req, res) => {
    const { id } = req.params;
    const { type, capacity, price, availability } = req.body;
    try {
        const updatedUnit = await Unit.findByIdAndUpdate(id, {
            type,
            capacity,
            price,
            availability
        }, { new: true });
        if (updatedUnit) {
            res.status(200).json(updatedUnit);
        } else {
            res.status(404).json({ message: 'Unit not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Unit
export const deleteUnit = async (req, res) => {
    const { id } = req.params;
    try {
        const unit = await Unit.findByIdAndDelete(id);
        if (unit) {
            res.status(200).json({ message: 'Unit deleted successfully' });
        } else {
            res.status(404).json({ message: 'Unit not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
