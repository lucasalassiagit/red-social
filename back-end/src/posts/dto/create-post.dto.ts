import { IsInt, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({description:'Escriba su post'})
    @IsString()
    @MinLength(5)
    @MaxLength(1000)
    readonly content: string;

    @ApiProperty({description:'Escriba el id de usuario'})
    @IsInt()
    userId: number; // este campo lo recibimos en el body
}