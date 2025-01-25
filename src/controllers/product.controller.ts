import { Request, Response } from 'express';
import { createProductSchema, updateProductSchema } from '../validators/product.validator';
import { ProductService } from '../services/product.service';
import { ProductFilters } from '../interfaces';


const productService = new ProductService();

export class ProductController {
    async create(req: Request, res: Response): Promise<void> {
        try {
            const validatedData = createProductSchema.parse(req.body);
            const product = await productService.createProduct(validatedData);
            res.status(201).json({
                message: 'Product created successfully',
                status: 'success',
                data: product,
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const {
                page = '1',
                pageSize = '10',
                search = '',
                category,
                minPrice,
                maxPrice,
                sortBy = 'createdAt',
                sortOrder = 'DESC',
                startDate,
                endDate,
            } = req.query;
    
            // Construct the filters object
            const filters: ProductFilters = {
                page: parseInt(page as string),
                pageSize: parseInt(pageSize as string),
                search: search as string,
                category: category as string,
                minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
                maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
                startDate: startDate ? new Date(startDate as string) : undefined,
                endDate: endDate ? new Date(endDate as string) : undefined,
            };
    
            const result = await productService.getAllProducts(filters);
    
            res.status(200).json({
                message: 'Products fetched successfully',
                status: 'success',
                data: result,
            });
        } catch (error: any) {
            console.error('Error fetching products:', error.message); // Log for debugging
            res.status(500).json({ message: 'Error fetching products' });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const product = await productService.getProductById(id);
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
                return; // Ensure the function exits here
            }
            res.status(200).json({
                message: 'Product fetched successfully',
                status:'success',
                data: product,
            });
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching product' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const validatedData = updateProductSchema.parse(req.body);
            const product = await productService.updateProduct(id, validatedData);
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
                return; 
            }
            res.status(200).json({
                message: 'Product updated successfully',
                status:'success',
                data: product,
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    // Assuming you have a service that deletes a product
    async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const product = await productService.deleteProduct(id);
    
            if (!product) {
                res.status(404).json({ message: "Product not found" });
                return
            }
    
            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error: any) {
            console.error('Error deleting product:', error.message); // Log for debugging
            res.status(500).json({ message: "Error deleting product" });
        }
    }
}