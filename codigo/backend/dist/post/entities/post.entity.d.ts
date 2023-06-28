import { User } from "../../user/entities/user.entity";
export declare class Post {
    id: number;
    content: string;
    tags: string[];
    likes: number;
    saves: number;
    comments: string[];
    imgURL: string;
    user: Promise<User>;
}
