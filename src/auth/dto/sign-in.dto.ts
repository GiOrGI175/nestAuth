import { IsNotEmpty, IsString, Length } from 'class-validator';

export class signInDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
