import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    validateAdminUser(id: string): Promise<{
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
}
