import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import authuser from '../middleware/auth.js';
import {
    placeOrder,
    placeOrderPhonepe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus,
    phonePeCallback 
} from '../controllers/ordercontroller.js';

const orderRouter = express.Router();

// admin features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// payment features
orderRouter.post('/place', authuser, placeOrder);
orderRouter.post('/phonepe', authuser, placeOrderPhonepe);
orderRouter.post('/razorpay', authuser, placeOrderRazorpay);

// user features
orderRouter.post('/useorders', authuser, userOrders);

// PhonePe callback
orderRouter.post('/phonepe/callback', phonePeCallback);

export default orderRouter;
