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
const cors = require('cors');
app.use(cors({
    origin: 'https://admin.piiwear.com',
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
