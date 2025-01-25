import { z } from 'zod';

// Validation for creating a product
export const createProductSchema = z.object({
    name: z.string().min(1),
    price: z.number().min(0),
    description: z.string().min(1),
    stock_quantity: z.number().min(0),
    category: z.string().min(1),
});

// Validation for updating a product
export const updateProductSchema = z.object({
    name: z.string().min(3).optional(),
    price: z.number().positive().optional(),
    description: z.string().min(10).optional(),
    stockQuantity: z.number().int().min(0).optional(),
    category: z.string().min(1).optional(),
});