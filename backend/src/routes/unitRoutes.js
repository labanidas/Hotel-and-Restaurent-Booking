// routes/unitRoutes.js

import express from 'express';
import { createUnit, getAllUnits, getUnitById, updateUnit, deleteUnit } from '../controllers/unitController.js';
import { protectedRoute, protectedRouteVendor } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes for units
router.post('/', protectedRoute, protectedRouteVendor, createUnit); // Only vendors can create units
router.get('/', getAllUnits);
router.get('/:id', getUnitById);
router.put('/:id', protectedRoute, protectedRouteVendor, updateUnit); // Only vendors can update units
router.delete('/:id', protectedRoute, protectedRouteVendor, deleteUnit); // Only vendors can delete units

export default router;
