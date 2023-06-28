import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { ResetPasswordDTO } from './dto/resetPassword.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(data: CreateUserDTO): Promise<{
        id: string;
        email: string;
        name: string;
    }>;
    update(id: string, data: any): Promise<{
        message: string;
        statusCode: number;
        description: string;
    }>;
    getOne(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        bornDate: Date;
        gender: string;
        n_dell: string;
        managerId: string;
        habilities: string;
        createdAt: Date;
        updatedAt: Date;
        isAdmin: boolean;
        projects: import(".prisma/client").Project[];
        projectsColeader: import(".prisma/client").Project[];
        photoURL: string;
        area: string;
        linkedin: string;
        highlights: string;
    }>;
    getUser(req: any): Promise<{
        id: string;
        email: string;
        name: string;
        bornDate: Date;
        gender: string;
        n_dell: string;
        managerId: string;
        habilities: string;
        createdAt: Date;
        updatedAt: Date;
        isAdmin: boolean;
        projects: import(".prisma/client").Project[];
        projectsColeader: import(".prisma/client").Project[];
        photoURL: string;
        area: string;
        linkedin: string;
        highlights: string;
    }>;
    getAll(): Promise<{
        id: string;
        email: string;
        name: string;
        bornDate: Date;
        gender: string;
        n_dell: string;
        managerId: string;
        habilities: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    Auth(): Promise<string>;
    getByName(name: string): Promise<{
        id: string;
        name: string;
        n_dell: string;
    }[]>;
    delete(id: string): Promise<{
        message: string;
        statusCode: number;
        description: string;
    }>;
    sendForgotEmail(email: string): Promise<{
        message: string;
        statusCode: number;
        description: string;
    }>;
    resetPassword(data: ResetPasswordDTO): Promise<{
        message: string;
        statusCode: number;
        description: string;
    }>;
    addHigh(data: any, req: any): Promise<{
        message: string;
        statusCode: number;
        description: string;
    }>;
    getRank(req: any): Promise<{
        ranking: {
            id: string;
            name: string;
            points: number;
        }[];
        position: number;
    }>;
}
