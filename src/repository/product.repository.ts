
import { Op, Order } from 'sequelize';
import Product from '../db/models/product';
import { IProductCreate, IProductUpdate, ProductFilters } from '../interfaces';

export class ProductRepository {
    async createProduct(productData: IProductCreate) {
        return await Product.create({ ...productData });
    }

    async getAllProducts(filters: ProductFilters) {
        const { page, pageSize, search, category, minPrice, maxPrice, sortBy, sortOrder, startDate, endDate,} = filters;
    
        const whereConditions: any = {
            name: {
                [Op.like]: `%${search}%`,
            },
            ...(category && { category }),
            ...(minPrice && { price: { [Op.gte]: minPrice } }),
            ...(maxPrice && { price: { [Op.lte]: maxPrice } }),
            ...(startDate && { createdAt: { [Op.gte]: startDate } }),
            ...(endDate && { createdAt: { [Op.lte]: endDate } }),
        };

        const order: Order = [[sortBy, sortOrder]];
    
        const options = {
            where: whereConditions,
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order,
        };
    
        try {
            return await Product.findAndCountAll(options);
        } catch (error: any) {
            console.error('Database query error:', error.message); // Log for debugging
            throw new Error('Error fetching products');
        }
    }

    async getProductById(id: string): Promise<Product> {
        const product = await Product.findByPk(id);
        if (!product) throw new Error('Product not found');
        return product;
    }

    async updateProduct(id: string, updatedData: IProductUpdate): Promise<Product | null> {
        const product = await Product.findByPk(id);
        if (!product) return null;
        return await product.update(updatedData);
    }

    async deleteProduct(id: string) {
        const product = await Product.findByPk(id);
        if (!product) return null;  
        return await product.destroy();  
    }
}