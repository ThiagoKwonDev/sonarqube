import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Body('userName') userName: string,
    @Body('password') password: string,
  ) {
    return this.userService.create(userName, password);
  }
 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
