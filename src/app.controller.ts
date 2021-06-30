import { Controller, Get, Param } from '@nestjs/common';


@Controller()
export class AppController {
  constructor() {}

  @Get(':id')
  createUser(@Param('id') id): string {
    return "user created" + id
  }
}
