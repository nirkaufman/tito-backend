import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "src/services/users.service";


@Controller('user')
export class UsersControler {

    constructor(private userService: UsersService) {}


    @Get(':userId')
    getUser(@Param('userId') userId: string) {
        return this.userService.getUser(userId)
    } 

    @Post('create')
    createNewUser(@Body('name') name: string, @Body('bid') bid: string) {
        return this.userService.createUser(name, bid);
    }

}