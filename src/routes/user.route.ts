import express from 'express';
import { UserController } from '../controllers/user.controller';
import authMiddleware from '../middleware/authMiddleware';
import roleMiddleware from '../middleware/roleMiddleware';

const router = express.Router();
const userController = new UserController();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints to manage users
 */

// Route to create a new user
router.post('/create', userController.create);

// Route to login a user
router.post('/login', userController.login);

// Route to get all users with filters
router.get('/', authMiddleware, userController.getAll);

// Route to get a user by their ID
router.get('/:id', authMiddleware, userController.getById);

// Route to update a user by their ID
router.put('/:id', authMiddleware, userController.update);

// Route to delete a user by their ID
router.delete('/:id', authMiddleware, userController.deleteById);

export default router;