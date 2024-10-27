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

const phonePeCallback = (req, res) => {
    // your callback logic here
};





// All orders data for admin pannel 

//placing order using COD method

const allOrders = async (req,res)=>{

    try {

        const orders= await orderModel.find({})
         res.json({success:true,orders})

    } catch (error) {

        console.log(error)
        res.json({success:false,message:error.message})
        
    }
}

//User order data for frontend

const userOrders = async (req,res)=>{

    try {

        const {userId}=req.body
        const orders = await orderModel.find({userId})
        res.json({success:true,orders})
        
    } catch (error) {

        console.log(error)
        res.json({success:false,message:error.message})
    }
    
}

//updating order status from Admin Pannel

const updateStatus = async (req,res)=>{

    try {
         
        const {orderId, status}= req.body
        await orderModel.findByIdAndUpdate(orderId,{status})

        res.json({success:true,message:"Status Updated"})

    } catch (error) {

        console.log(error)
        res.json({success:false,message:error.message})
        
    }
    
}

export { placeOrder, allOrders, userOrders, updateStatus, phonePeCallback };
