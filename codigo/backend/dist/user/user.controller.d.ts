import { UserService } from "./user.service";
import { LoginDto } from "./dto/login.dto";
import { User } from "./entities/user.entity";
export interface PassportRequest extends Request {
    user?: User;
}
export interface LoginResponse {
    accessToken: string;
}
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    login(loginDto: LoginDto): Promise<LoginResponse>;
    testJwt(req: PassportRequest): User;
}
