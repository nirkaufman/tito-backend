import { Inject } from "@nestjs/common"
import { CategoryEntity } from "src/entities/category.entity"
import { Repository } from "typeorm"

export class CategoriesService {
    constructor(
        @Inject('CATEGORY_REPOSITORY')
        private CategoriesRepository: Repository<CategoryEntity>,
    ) { }

    async getAllCategories() {
        return await this.CategoriesRepository.find()
    }

    async getCategory(categoryId: string) {
        return await this.CategoriesRepository.findOne(categoryId)
    }

}