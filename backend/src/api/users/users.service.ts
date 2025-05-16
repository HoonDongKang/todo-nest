import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async find() {}
  async create(createUserDto: CreateUserDto): Promise<User | null> {
    return await this.userRepository.save(createUserDto);
  }
  async update() {}
  async delete() {}
}
