import { HttpService } from "@nestjs/axios";
import { LoginDto } from "./dto/login.dto";
import { LoginResponse } from "./user.controller";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
export declare class UserService {
    private readonly httpService;
    private repository;
    constructor(httpService: HttpService, repository: Repository<User>);
    login(loginDto: LoginDto): Promise<LoginResponse>;
    findOne(userIdLegacy: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
}
