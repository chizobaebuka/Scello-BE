
import { ILoginData, IUserCreate, IUserUpdate, UserFilters } from '../interfaces';
import { UserRepository } from '../repository/user.repository';

export class UserService {
    private readonly userRepo: UserRepository;

    constructor() {
        this.userRepo = new UserRepository();
    }

    async createUser(userData: IUserCreate) {
        return await this.userRepo.createUser(userData);
    }

    async loginUser(loginData: ILoginData) {
        return await this.userRepo.loginUser(loginData);
    }

    async getAllUsers(filters: UserFilters) {
        return await this.userRepo.getAllUsers(filters);
    }

    async getUserById(id: string) {
        return await this.userRepo.getUserById(id);
    }

    async updateUser(id: string, updatedData: IUserUpdate) {
        return await this.userRepo.updateUser(id, updatedData);
    }

    async deleteUser(id: string) {
        return await this.userRepo.deleteUser(id);
    }
}