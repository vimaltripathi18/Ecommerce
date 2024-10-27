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

// Placing order using PhonePe method
const placeOrderPhonepe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        // Step 1: Save the order to your database
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "PhonePe",
            payment: false,
            date: Date.now(),
        };
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Step 2: Prepare the payload
        const payload = {
            merchantId: process.env.PHONEPE_KEY_ID,
            merchantTransactionId: newOrder._id.toString(), // Unique transaction ID
            amount: amount * 100, // Amount in paise
            callbackUrl: "https://localhost:4000/api/order/phonepe/callback", // Your success callback URL
            redirectUrl: "https://localhost:4000/api/order/phonepe", // Your redirect URL
            redirectMode: "REDIRECT", // or "POST"

        };

        // Step 3: Generate the signature
        const secretKey = process.env.PHONEPE_KEY_SECRET; // Replace with your actual secret key
        const payloadString = JSON.stringify(payload);
        const signature = generateSignature(payloadString, secretKey);

        // Step 4: Send request to PhonePe
        const phonePeResponse = await axios.post('https://api-preprod.phonepe.com/apis/pg/v1/pay', {
            request: Buffer.from(payloadString).toString('base64'), // Base64 encode the payload
        }, {
            headers: {
                'X-VERIFY': `${signature}###${secretKey}`,
                'Content-Type': 'application/json',
            },
        });

        // Step 5: Handle the response
        if (phonePeResponse.data.success) {
            res.json({ success: true, paymentUrl: phonePeResponse.data.paymentUrl });
        } else {
            res.json({ success: false, message: phonePeResponse.data.message });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Checking PhonePe callback
const phonePeCallback = async (req, res) => {
    try {
        const { transactionId, status } = req.body;

        // Check the status and update the order
        if (status === 'SUCCESS') {
            await orderModel.updateOne({ _id: transactionId }, { payment: true });
            return res.json({ success: true, message: 'Payment successful' });
        } else {
            return res.json({ success: false, message: 'Payment failed' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Other functions (placeOrderRazorpay, allOrders, userOrders, updateStatus) remain unchanged...

export { placeOrder, placeOrderPhonepe, phonePeCallback };
//placing order using Razorpay method

const placeOrderRazorpay = async (req,res)=>{
    
}

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

export{placeOrder,placeOrderPhonepe,phonePeCallback,placeOrderRazorpay,allOrders,userOrders,updateStatus}