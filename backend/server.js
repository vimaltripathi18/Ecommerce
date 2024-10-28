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
app.use(cors({
  origin: ['https://admin.piiwear.com'], 
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
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

// Error Handling Middleware (for debugging purposes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'An error occurred!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
