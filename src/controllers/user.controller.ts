import { Request, Response } from 'express';
import { createUserSchema, loginUserSchema, updateUserSchema } from '../validators/user.validator';
import { UserService } from '../services/user.service';
import { UserRole } from '../db/models/user';
import { ILoginData, IUserCreate, IUserUpdate } from '../interfaces';
import bcryptjs from 'bcryptjs';

const userService = new UserService();

export class UserController {
    async create(req: Request, res: Response): Promise<void> {
        try {
            const validatedData = createUserSchema.parse(req.body);
            const hashedPassword = await bcryptjs.hash(validatedData.password, 10); 
    
            const userData: IUserCreate = {
                ...validatedData,
                password: hashedPassword,  
                role: UserRole[validatedData.role as keyof typeof UserRole], 
            };
    
            const user = await userService.createUser(userData);
    
            res.status(201).json({
                message: 'User created successfully',
                status: 'success',
                data: user,
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const validatedData = loginUserSchema.parse(req.body);
            const loginData: ILoginData = {
                email: validatedData.email,
                password: validatedData.password,
            }

            const loggedInUser = await userService.loginUser(loginData);

            res.status(201).json({
                message: 'User logged in successfully',
                status:'success',
                data: loggedInUser,
            })

        } catch (error: any) {
            res.status(500).json({ message: 'Error logging in user', error: error.message });
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const { page = 1, pageSize = 10, search = '', role, sortBy = 'createdAt', sortOrder = 'DESC' } = req.query;

            const filters = {
                page: parseInt(page as string),
                pageSize: parseInt(pageSize as string),
                search: search as string,
                role: role as string,
                sortBy: sortBy as string,
                sortOrder: sortOrder as 'ASC' | 'DESC',
            };

            const result = await userService.getAllUsers(filters);

            res.status(200).json({
                message: 'Users fetched successfully',
                status: 'success',
                data: result,
            });
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching users' });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json({
                message: 'User fetched successfully',
                status: 'success',
                data: user,
            });
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching user' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const validatedData = updateUserSchema.parse(req.body);
    
            // Map the role (string literal) to UserRole enum if provided
            const updatedData: IUserUpdate = {
                ...validatedData,
                role: validatedData.role ? UserRole[validatedData.role as keyof typeof UserRole] : undefined, 
            };
    
            const user = await userService.updateUser(id, updatedData);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
    
            res.status(200).json({
                message: 'User updated successfully',
                status: 'success',
                data: user,
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const user = await userService.deleteUser(id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json({
                message: 'User deleted successfully',
                status: 'success',
            });
        } catch (error: any) {
            res.status(500).json({ message: 'Error deleting user' });
        }
    }
} 