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
// import { JwtService } from '@nestjs/jwt';
import { JwtService } from '../jwt/jwt.service';
import { TokenUserDto } from '../users/dto/token-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

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
  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto);

    const payload: TokenUserDto = {
      sub: user.id,
      username: user.username,
      nickname: user.nickname,
    };

    const accessToken = this.jwtService.generateAccessToken(payload);
    const refreshToken = this.jwtService.generateRefreshToken({
      sub: payload.sub,
    });

    return { accessToken, refreshToken };
  }
}
