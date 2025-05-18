import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/database/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findByUsername(@Query('username') username: string) {
    return await this.userService.findByUsername(username);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User | null> {
    return await this.userService.create(createUserDto);
  }

  @Put()
  async update() {}

  @Delete()
  async delete() {}
}
