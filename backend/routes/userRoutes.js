import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for admin login (if you plan to implement it later)
router.post('/admin', adminLogin);

export default router;
