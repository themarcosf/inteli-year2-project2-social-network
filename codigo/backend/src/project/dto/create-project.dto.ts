import { IsString } from "class-validator";
////////////////////////////////////////////////////////////////////////////////

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  tags: string;

  @IsString()
  roles: string;

  @IsString()
  start: Date;

  @IsString()
  end: Date;

  @IsString()
  endSubscription: Date;

  @IsString()
  badge: string;

  @IsString()
  coleaderId?: string;
}
