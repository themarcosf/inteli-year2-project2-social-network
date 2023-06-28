import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { Post } from "./entities/post.entity";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
export interface PassportRequest extends Request {
    user?: User;
}
export declare class PostController {
    private readonly postService;
    private readonly userService;
    constructor(postService: PostService, userService: UserService);
    create(req: PassportRequest, createPostDto: CreatePostDto): Promise<Post>;
    findAll(): Promise<Post[]>;
    findOne(id: number): Promise<Post>;
}
