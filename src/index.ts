import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/sequelize';
import productRouter from './routes/product.route';
import userRouter from './routes/user.route';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./swagger";

dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection 
connectDB()

// Default route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routing 
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

// Start the server
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});