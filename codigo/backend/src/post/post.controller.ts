/** nestjs */
import {
  Controller,
  Get,
  Post as NestPost,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Put,
} from "@nestjs/common";

/** service */
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { Post } from "./entities/post.entity";
import { User } from "../user/entities/user.entity";
import { AuthGuard } from "../user/guards/auth.guard";
import { UserService } from "../user/user.service";
import { UpdatePostDto } from "./dto/update-post.dto";
import { DeletePostDto } from "./dto/delete-post.dto";

export interface PassportRequest extends Request {
  user?: User;
}

@Controller("post")
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService
  ) { }

  // @UseGuards(AuthGuard)
  @NestPost()
  async create(
    @Req() req: PassportRequest,
    @Body() createPostDto: CreatePostDto
  ): Promise<Post> {
    const user = await this.userService.findOne("c433958d-1fa6-4b22-94ca-014a967013fa");
    return await this.postService.create(createPostDto, user.userIdLegacy);
  }

  @Get()
  findAll(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.postService.findOne(id);
  }
  @Put("update/:id")
  update(@Param("id") id: number, @Body() data: any) {
    return this.postService.update(id, data);
  }

  @Delete("delete/:id")
  remove(@Param("id") id: number) {
    return this.postService.remove(id);
  }
}
