import { Inject } from "@nestjs/common";
import { BusinessEntity } from "src/entities/business.entity";
import { Repository } from "typeorm";

export class BusinessesService {
    constructor(
        @Inject('BUSINESS_REPOSITORY')
        private BusinessesRepository: Repository<BusinessEntity>,
    ) { }

    async getAllBusinesses() {
        return await this.BusinessesRepository.find()
    }

    async getBusiness(businessId: string) {
        return await this.BusinessesRepository.findOne(businessId)
    }

    async addBusiness(businessName: string) {
        return await this.BusinessesRepository.insert({businessName: businessName})
    }

}