import express from 'express';
import { ProductController } from '../controllers/product.controller';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();
const productController = new ProductController();

/**
   * @swagger
   * tags:
   *   name: Products
   *   description: API endpoints to manage products
*/

// Route to create a product
router.post('/create', authMiddleware, productController.create);

// Route to get all products with filters
router.get('/', authMiddleware, productController.getAll);

// Route to get a product by its ID
router.get('/:id', authMiddleware, productController.getById);

// Route to update a product by its ID
router.put('/:id', authMiddleware, productController.update);

// Route to delete a product by its ID
router.delete('/:id', authMiddleware, productController.deleteProduct);

export default router;