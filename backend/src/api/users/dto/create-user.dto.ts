import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '아이디는 필수 입력 항목입니다.' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: '비밀번호는 필수 입력 항목입니다.' })
  @IsString()
  password: string;

  @IsNotEmpty({ message: '닉네임 필수 입력 항목입니다.' })
  @IsString()
  nickname: string;

  createdAt: Date;
}
