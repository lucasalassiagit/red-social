import { IsInt, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePostDto {
    @ApiProperty({description:'Escriba su post'})
        @IsString()
        @MinLength(5)
        readonly content: string;
}