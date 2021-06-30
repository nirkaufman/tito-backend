import { Body, Controller, Get, Header, Param, Post } from "@nestjs/common";
import { EventsService } from "src/services/events.service";

@Controller('events')
export class EventsController {

    constructor(private eventsService: EventsService) {}

    @Post('tapIn/:userId')
    @Header('content-type', 'application/json')
    tapIn(@Param('userId') userId: string, @Body('categoryId') categoryId: string ) {
        return this.eventsService.startEvent(userId, categoryId);
    }

    @Post('tapOut/:eventId')
    tapOut(@Param('eventId') eventId){
        return this.eventsService.stopEvent(eventId)
    }

   

}