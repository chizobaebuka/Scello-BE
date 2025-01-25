import { UserRole } from "../db/models/user";

export interface ICore {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProductFilters {
    page: number;
    pageSize: number;
    search: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy: string;
    sortOrder: 'ASC' | 'DESC';
    startDate?: Date;  
    endDate?: Date; 
}

export interface IProduct extends ICore {
    name: string;
    price: number;
    description: string;
    stockQuantity: number;
    category: string; 
}

export interface IProductCreate extends ICore {
    name: string;
    price: number;
    description: string;
    stock_quantity: number;
    category: string; 
}

export interface IProductUpdate {
    name?: string;
    price?: number;
    description?: string;
    stockQuantity?: number;
    category?: string; 
}

export interface IUser extends ICore {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface IUserCreate extends ICore {
    name: string;
    email: string;
    password: string;
    role?: UserRole; 
}

export interface IUserUpdate {
    name?: string;
    email?: string;
    password?: string;
    role?: UserRole;
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface UserFilters {
    page: number;
    pageSize: number;
    search?: string;
    role?: string;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}