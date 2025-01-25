import { FindOptions, Op } from 'sequelize';
import { ILoginData, IUser, IUserCreate, IUserUpdate, UserFilters } from '../interfaces';
import bcryptjs from 'bcryptjs';
import User from '../db/models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class UserRepository {
    async createUser(userData: IUserCreate) {
        const { id, createdAt, updatedAt, ...validUserData } = userData; 
        return await User.create(validUserData);
    }

    async loginUser(loginData: ILoginData) {
        const { email, password } = loginData
        const user = await User.findOne({ where: { email } });
        if(!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error('No JWT secret key provided');
        }

        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

        return {
            userId: user.id,
            token,
        };

    }

    async getAllUsers(filters: UserFilters) {
        const { page, pageSize, search, role, sortBy, sortOrder } = filters;
    
        const finalPage = page ?? 1;
        const finalPageSize = pageSize ?? 10;
        const finalSearch = search ?? '';
        const finalRole = role ?? undefined;
        const finalSortBy = sortBy ?? 'createdAt'; 
        const finalSortOrder = sortOrder ?? 'DESC'; 
    
        const where: any = {};
        if (finalSearch) {
            where.name = { [Op.iLike]: `%${finalSearch}%` };
        }
        if (finalRole) {
            where.role = finalRole;
        }
    
        const offset = (finalPage - 1) * finalPageSize;
        const limit = finalPageSize;
    
        const findOptions: FindOptions<IUser> = {
            where,
            offset,
            limit,
            order: [[finalSortBy, finalSortOrder]],
        };
    
        const users = await User.findAndCountAll(findOptions);
    
        return {
            totalItems: users.count,
            totalPages: Math.ceil(users.count / finalPageSize),
            currentPage: finalPage,
            users: users.rows,
        };
    }

    async getUserById(id: string) {
        return await User.findByPk(id);
    }

    async updateUser(id: string, userData: IUserUpdate) {
        const [affectedRows, updatedUsers] = await User.update(userData, {
            where: { id },
            returning: true,
        });

        return affectedRows > 0 ? updatedUsers[0] : null;
    }

    async deleteUser(id: string) {
        return await User.destroy({ where: { id } });
    }
}