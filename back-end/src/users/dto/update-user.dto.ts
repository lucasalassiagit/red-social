import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(100)
    readonly name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(100)
    readonly username?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(200)
    password?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsEmail()
    @MaxLength(200)
    readonly email?: string;
}