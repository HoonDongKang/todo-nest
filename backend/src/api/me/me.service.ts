import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/user.entity';
import { Repository } from 'typeorm';
import { UserResponseDto } from '../users/dto/response-user.dto';

@Injectable()
export class MeService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getInfo(sub: number): Promise<UserResponseDto> {
    if (!sub) throw new BadRequestException('Payload sub is required');

    const user = await this.userRepository.findOne({
      where: { id: sub },
      select: ['id', 'username', 'nickname'],
    });
    if (!user) throw new NotFoundException('User not found');
    const { id, username, nickname } = user;

    return { id, username, nickname };
  }
}
