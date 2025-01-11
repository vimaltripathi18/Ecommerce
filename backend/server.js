import express from 'express';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartroute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect to Database and Cloudinary
connectDB();
connectCloudinary();

// Define allowed origins
const allowedOrigins = [
    'https://piiwear.com',
    'https://admin.piiwear.com'
];

// CORS Middleware - Fixes the "multiple values" CORS issue
app.use((req, res, next) => {
    const origin = req.headers.origin;
    
    console.log(`Request Origin: ${origin}`); // Debugging: Log incoming origin

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin); // Set only the request's origin
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials
        res.setHeader('Access-Control-Max-Age', '86400'); // Cache preflight request for 24 hours
    }

    // Handle OPTIONS preflight requests for CORS
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

// Parse incoming requests
app.use(express.json());

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Default route for testing if the server is running
app.get('/', (req, res) => {
    res.send('API is running');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

