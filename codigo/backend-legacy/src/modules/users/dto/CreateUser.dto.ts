import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";

export class CreateUserDTO {

    @ApiProperty({
        description: 'User name',
        example: 'Nome Teste',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'User email',
        example: 'teste@teste.com',
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'User password',
        example: 'id',
    })
    @IsString()
    managerId: string;

    @ApiProperty({
        description: 'User password',
        example: '123456',
    })
    @IsString()
    password: string;

    @ApiProperty({
        description: 'User CPF',
        example: '123456',
    })
    @IsString()
    cpf: string;

     
    @ApiProperty({
        description: 'User phone',
        example: '[{name:JS, level: medio}',
    })
    @IsString()
    habilities: string;

    @ApiProperty({
        description: 'Gener',
        example: 'feminine',
    })
    @IsString()
    gender: string;

    @ApiProperty({
        description: 'Identification number',
        example: '123456',
    })
    @IsString()
    n_dell: string;

    photoURL?: string;
}