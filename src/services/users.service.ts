import { Inject } from "@nestjs/common";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";

export class UsersService {

    constructor(
        @Inject('USERS_REPOSITORY')
        private UsersRepository: Repository<UserEntity>,
    ) { }

    async getUser(userId) {
        return await this.UsersRepository.findOne(userId)
    }

    createUser(name: string, businessId: string) {
        return this.UsersRepository.create({
            userName: name, bussinessId: businessId
        });
    }

}