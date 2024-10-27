import PhonePe from "phonepe-kit";
import orderModel from "../models/ordermodel.js";
import userModel from "../models/userModel.js";
import axios from "axios";
import crypto from "crypto";
import generateSignature from "../utils/generatesignature.js";

// Placing order using COD method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Example implementation for phonePeCallback
const phonePeCallback = async (req, res) => {
    // Your callback logic here
    res.json({ success: true, message: "PhonePe callback handled" });
};

// Example implementation for placeOrderPhonepe
const placeOrderPhonepe = async (req, res) => {
    // Your logic for placing order using PhonePe here
    res.json({ success: true, message: "Order placed with PhonePe" });
};

// All orders data for admin panel 
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// User order data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Updating order status from Admin Panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Exporting functions
export {
    placeOrder,
    placeOrderPhonepe,
    allOrders,
    userOrders,
    updateStatus,
    phonePeCallback
};
