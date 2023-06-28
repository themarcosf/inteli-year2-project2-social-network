import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";


export class ResetPasswordDTO {
    @ApiProperty({
        description: 'User email',
        example: 'teste@teste.com',
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'User password',
        example: '123123',
    })
    @IsString()
    newPassword: string;

    @ApiProperty({
        description: 'User password',
        example: '123',
    })
    @IsString()
    code: string;
}