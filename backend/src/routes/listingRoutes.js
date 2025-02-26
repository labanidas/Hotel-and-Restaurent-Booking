// routes/listingRoutes.js

import express from "express";
import {
  addListing,
  getAllListings,
  getListing,
  updateListing,
  deleteListing,
} from "../controllers/listingController.js";

import {
  userUploads,
  uploadMiddleware,
} from "../controllers/imageUpload.js";

import {
  protectedRoute,
  protectedRouteVendor,
  protectedRouteCustomer,
  protectedRouteAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protectedRoute, protectedRouteVendor, addListing);
router.get("/", protectedRoute, getAllListings);
router.get("/:id", protectedRoute, getListing);
router.put("/:id", protectedRoute, protectedRouteVendor, updateListing);
router.delete("/:id", protectedRoute, protectedRouteVendor, deleteListing);

router.post("/user-upload", protectedRoute, protectedRouteVendor, uploadMiddleware, userUploads);

export default router;
