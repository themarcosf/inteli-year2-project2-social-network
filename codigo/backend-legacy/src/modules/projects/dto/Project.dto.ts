import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsDate } from 'class-validator';

export class ProjectDTO {
  @ApiProperty({
    description: 'Project name',
    example: 'Desenvolvimento de aplicação',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Project description',
    example: 'o projeto e sobre desenvolvimento de uma aplicação',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Project tags',
    example: 'tags',
  })
  @IsString()
  tags: string;

  @ApiProperty({
    description: 'Project roles',
    example: 'roles',
  })
  @IsString()
  roles: string;

  @ApiProperty({
    description: 'Project start date',
    example: '10/10/2023',
  })
  @IsString()
  start: Date;

  @ApiProperty({
    description: 'Project end date',
    example: '10/10/2023',
  })
  @IsString()
  end: Date;

  @ApiProperty({
    description: 'End subscription date',
    example: '10/10/2023',
  })
  @IsString()
  endSubscription: Date;

  @ApiProperty({
    description: 'Badge NFT',
    example: 'badge',
  })
  @IsString()
  badge: string;

  @ApiProperty({
    description: 'Project coleader ID',
    example: '56',
  })
  @IsString()
  coleaderId?: string;
}
