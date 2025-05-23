import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from 'src/api/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { Request, Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Post('/login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, accessToken } =
      await this.authService.login(loginUserDto);

    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
      })
      .json({
        accessToken,
      });
  }

  @Post('/refresh')
  async refresh(@Req() request: Request) {
    const refreshToken: string | null = request.cookies?.['refreshToken'];
    if (!refreshToken) throw new BadRequestException('Refresh token missing');

    const accessToken = await this.authService.refreshAccessToken(refreshToken);
    return accessToken;
  }
}
