import { Inject } from "@nestjs/common"
import { exception } from "console"
import { EventEntity, Status } from "src/entities/event.entity"
import { Repository } from "typeorm"

export class EventsService {
    constructor(
        @Inject('EVENT_REPOSITORY')
        private EventsRepository: Repository<EventEntity>,
    ) { }

    //return eventId
    async startEvent(userId: string, categoryId: string){
        const userEvents : EventEntity[] = await this.EventsRepository.find({userId})
        if(this.userHaveActiveEvent(userEvents))
            throw new Error('user have an acrive event');

        const date = new Date();

        return this.EventsRepository.insert({
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
        await this.EventsRepository.update({eventId: eventId},{endTime: date, status: Status.INACTIVE})
        const event: EventEntity = await this.EventsRepository.findOne(eventId)

        return new Date(event.endTime.getTime() - event.startTime.getTime()).getTime()
        
    }

    

    userHaveActiveEvent(userEvents: EventEntity[]): boolean{
        return userEvents.some( (event) => event.status == Status.ACTIVE)            
    }

}