
import { IProductCreate, IProductUpdate, ProductFilters } from '../interfaces';
import { ProductRepository } from '../repository/product.repository';

export class ProductService {
    private readonly productRepo: ProductRepository;

    constructor() {
        this.productRepo = new ProductRepository();
    }

    async createProduct(productData: IProductCreate) {
        return await this.productRepo.createProduct(productData);
    }

    async getAllProducts(filters: ProductFilters) {
        return await this.productRepo.getAllProducts(filters);
    }

    async getProductById(id: string) {
        return await this.productRepo.getProductById(id);
    }

    async updateProduct(id: string, updatedData: IProductUpdate) {
        return await this.productRepo.updateProduct(id, updatedData);
    }

    async deleteProduct(id: string) {
        return await this.productRepo.deleteProduct(id);
    }
}