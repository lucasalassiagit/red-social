import { IsInt, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComentarPostDto {
  //Para swagger
  @ApiProperty({ description: 'Ingrese comentarios para el post'})
  @IsString()
  @MinLength(5)
  readonly comments: string;

  @ApiProperty({ description: 'Ingrese el id del post'})
  @IsInt()
  readonly userId: number; // este campo lo recibimos en el body
}
