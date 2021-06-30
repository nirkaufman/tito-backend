import { Controller, Get, Param } from "@nestjs/common";
import { BusinessEntity } from "src/entities/business.entity";
import { BusinessesService } from "src/services/businesses.service";

@Controller('businesses')
export class BusinessesController {

    constructor(private businessesService: BusinessesService) {}

    @Get()
    getAllBusiness() {
        return this.businessesService.getAllBusinesses();
    }

    @Get(':businessId')
    getBusiness(@Param('businessId') businessId: string) {
        return this.businessesService.getBusiness(businessId)
    } 

   

}