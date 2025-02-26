import express from 'express';
import { register, login, logout, checkAuth } from '../controllers/authController.js';
import { validateRegister, validateLogin } from '../utils/validateInput.js';
import { protectedRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.get("/check", protectedRoute, checkAuth);

export default router;
