import express from 'express';
import cors from 'cors';
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

// Apply CORS middleware

const allowedOrigins = [
    'https://piiwear.com',
    'https://admin.piiwear.com'
];

app.use(cors({
    origin: (origin, callback) => {
        // Check if the request's origin is in the allowedOrigins array
        if (allowedOrigins.includes(origin)) {
            callback(null, origin); // Only allow the specific origin
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));




// Parse incoming requests
app.use(express.json());

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Default route for testing server is running
app.get('/', (req, res) => {
  res.send('API');
});


// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
