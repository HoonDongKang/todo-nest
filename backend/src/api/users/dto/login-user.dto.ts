import { IsNotEmpty, IsString, MinLength, minLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: '아이디는 필수 입력 항목입니다.' })
  @MinLength(4, { message: '아이디는 최소 4자 이상입니다.' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: '비밀번호는 필수 입력 항목입니다.' })
  @MinLength(6, { message: '비밀번호는 최소 6자 이상입니다.' })
  @IsString()
  password: string;

  createdAt: Date;
}
