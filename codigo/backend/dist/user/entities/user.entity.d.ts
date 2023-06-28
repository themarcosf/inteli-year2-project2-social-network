import { Post } from "../../post/entities/post.entity";
export declare class User {
    id: number;
    userIdLegacy: string;
    email: string;
    name: string;
    posts: Promise<Post[]>;
}
