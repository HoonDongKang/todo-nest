import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { $bcrypt } from 'src/common/decorators/plugins/bcrypt';
import { User } from 'src/database/user.entity';
import { CreateUserDto } from 'src/api/users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UserService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(createUserDto: CreateUserDto): Promise<User | null> {
    const form = {
      ...createUserDto,
      password: await $bcrypt.hash(createUserDto.password),
    };

    return await this.userService.create(form);
  }

  async validateUser(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;

    const user = await this.userService.findByUsername(username);
    if (!user) throw new NotFoundException('User not found');

    const isPasswordValid = await $bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }
}
