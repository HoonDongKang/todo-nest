import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/users.module';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [UserModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
