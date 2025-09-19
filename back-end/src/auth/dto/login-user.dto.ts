import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({description: 'Ingrese nombre de usuario'})
  @IsString()
  readonly username: string;

  @ApiProperty({description: 'Ingrese password'})
  @IsString()
  @MinLength(6)
  readonly password: string;
}