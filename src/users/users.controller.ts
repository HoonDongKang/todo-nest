import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async find() {}

  @Post()
  async create() {}

  @Put()
  async update() {}

  @Delete()
  async delete() {}
}
