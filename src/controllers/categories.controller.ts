import { Controller, Get, Param } from "@nestjs/common";
import { CategoriesService } from "src/services/categories.service";

@Controller('categories')
export class CategoriesController {

    constructor(private categoriesService: CategoriesService) {}

    @Get()
    getAllCategories() {
        return this.categoriesService.getAllCategories()
    }

    @Get(':categoryId')
    getBusiness(@Param('categoryId') categoryId: string) {
        return this.categoriesService.getCategory(categoryId)
    } 

   

}