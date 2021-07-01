import { Inject } from "@nestjs/common"
import { exception } from "console"
import { CategoryEntity } from "src/entities/category.entity"
import { EventEntity, Status } from "src/entities/event.entity"
import { Repository } from "typeorm"

export class EventsService {
    constructor(
        @Inject('EVENT_REPOSITORY')
        private EventsRepository: Repository<EventEntity>,
        @Inject('CATEGORY_REPOSITORY')
        private CategoryRepository: Repository<CategoryEntity>,
    ) { }

    //return eventId
    async startEvent(userId: string, categoryId: string){
        const userEvents : EventEntity[] = await this.EventsRepository.find({ where: { userId: userId} })
        if(this.userHaveActiveEvent(userEvents))
            throw new Error('user have an acrive event');

        const date = new Date();

        return await this.EventsRepository.insert({
            userId: userId, 
            categoryId: categoryId, 
            status: Status.ACTIVE, 
            startTime: date
        });
    }

    async stopEvent(eventId: string){
        if( await (await this.EventsRepository.findOne(eventId)).status != Status.ACTIVE)
            throw new Error('not active event');

        const date = new Date();
        // await this.EventsRepository.update({eventId: eventId},{endTime: date, status: Status.INACTIVE})
        // const event: EventEntity = await this.EventsRepository.findOne(eventId)

        // return new Date(event.endTime.getTime() - event.startTime.getTime()).getTime()
        return await this.EventsRepository.update({eventId: eventId},{endTime: date, status: Status.INACTIVE})
        
    }

    async getResults(userId){
        let userEvents: EventEntity[] = await this.EventsRepository.find({ where: { userId: userId} })
        let results = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
        let totalTime = 0

        userEvents.forEach((event: EventEntity) => {
            let eventTotalTime = new Date(event.endTime.getTime() - event.startTime.getTime()).getTime()
            totalTime += eventTotalTime
            console.log(results[event.categoryId])
            results[event.categoryId] += eventTotalTime
        })

        for (const entry in results){
            results[entry] = Math.round((results[entry]/totalTime) * 100) + '%'
        }

        console.log(results)
        return results
    }

    

    userHaveActiveEvent(userEvents: EventEntity[]): boolean{
        return userEvents.some( (event) => event.status == Status.ACTIVE)            
    }

}