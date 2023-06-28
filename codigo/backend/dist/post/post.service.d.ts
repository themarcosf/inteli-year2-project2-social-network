import { Post } from "./entities/post.entity";
import { Repository } from "typeorm";
import { QueryRunnerFactory } from "../commom/queryRunner/query-runner.factory";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { UserService } from "../user/user.service";
export declare class PostService {
    private readonly repository;
    private readonly queryRunner;
    private readonly userService;
    constructor(repository: Repository<Post>, queryRunner: QueryRunnerFactory, userService: UserService);
    create(createPostDto: CreatePostDto, userId: string): Promise<Post>;
    findAll(): Promise<Post[]>;
    findOne(id: number): Promise<Post | null>;
    update(id: number, updatePostDto: UpdatePostDto): string;
    remove(id: number): string;
}
