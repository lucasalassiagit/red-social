import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({description: 'Ingrese su nombre'})
  @IsString()
  readonly name: string;

  @ApiProperty({description: 'Ingrese email'})
  @IsEmail()
  readonly email: string;

  @ApiProperty({description: 'Ingrese nombre de usuario'})
  @IsString()
  readonly username: string;

  @ApiProperty({description: 'Ingrese password'})
  @IsString()
  @MinLength(6)
  readonly password: string;
}
