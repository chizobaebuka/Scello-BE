import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/sequelize';
import productRouter from './routes/product.route';
import userRouter from './routes/user.route';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./swagger";
import { apiLimiter, errorHandler } from './utils';

dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler)

// Test database connection 
connectDB()

// Default route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routing 
app.use('/api/v1/products', apiLimiter, productRouter);
app.use('/api/v1/users', apiLimiter, userRouter);

// Start the server
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});