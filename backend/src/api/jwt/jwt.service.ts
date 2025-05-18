import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { TokenUserDto } from '../users/dto/token-user.dto';

@Injectable()
export class JwtService {
  private readonly JWT_SECRET = process.env.JWT_SECRET;
  private readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
  private readonly JWT_REFRESH_EXPIRES_IN =
    process.env.JWT_REFRESH_EXPIRES_IN || '30d';

  private sign(payload: Partial<TokenUserDto>, expiresIn: string): string {
    if (!this.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    if (!expiresIn) expiresIn = this.JWT_EXPIRES_IN;

    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn,
    });
  }

  verify(token: string): jwt.JwtPayload | string {
    if (!this.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    try {
      return jwt.verify(token, this.JWT_SECRET);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  decode(token: string): any {
    return jwt.decode(token);
  }

  generateAccessToken(payload: TokenUserDto): string {
    return this.sign(payload, this.JWT_EXPIRES_IN);
  }

  generateRefreshToken(payload: Partial<TokenUserDto>): string {
    return this.sign(payload, this.JWT_REFRESH_EXPIRES_IN);
  }
}
