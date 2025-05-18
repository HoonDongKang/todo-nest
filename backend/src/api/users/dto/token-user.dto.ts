import { IsString } from 'class-validator';

export class TokenUserDto {
  @IsString()
  sub: number;

  @IsString()
  username: string;

  @IsString()
  nickname: string;
}
