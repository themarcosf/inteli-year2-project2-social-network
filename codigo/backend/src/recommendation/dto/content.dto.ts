import { IsString } from "class-validator";

export class ContentDto {
  @IsString()
  userId: string;
  @IsString()
  content: string;
}