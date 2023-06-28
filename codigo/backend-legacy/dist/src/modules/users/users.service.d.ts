import { PrismaService } from '../../prisma.service';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { ResetPasswordDTO } from './dto/resetPassword.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    getUser(id: string): Promise<{
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
    getOneByEmail(email: string): Promise<import(".prisma/client").User>;
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
    getUserByName(name: string): Promise<{
        id: string;
        name: string;
        n_dell: string;
    }[]>;
    delete(id: string): Promise<{
        message: string;
        statusCode: number;
        description: string;
    }>;
    sendForgotPasswordEmail(email: string): Promise<{
        message: string;
        statusCode: number;
        description: string;
    }>;
    resetPassword(data: ResetPasswordDTO): Promise<{
        message: string;
        statusCode: number;
        description: string;
    }>;
    addHighligth(id: string, highligth: object): Promise<{
        message: string;
        statusCode: number;
        description: string;
    }>;
    getRanking(id: any): Promise<{
        ranking: {
            id: string;
            name: string;
            points: number;
        }[];
        position: number;
    }>;
}
