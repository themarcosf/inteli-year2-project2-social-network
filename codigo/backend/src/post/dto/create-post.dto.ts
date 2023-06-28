import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  imgURL: string;

  @IsString({ each: true })
  tags: string[];
}
