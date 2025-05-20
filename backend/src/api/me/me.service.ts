import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MeService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  getInfo(username: string) {
    return this.userRepository.find({ where: { username } });
  }
}
