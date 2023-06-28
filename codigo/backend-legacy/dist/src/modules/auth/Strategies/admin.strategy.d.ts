import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
declare const AdminStrategy_base: new (...args: any[]) => Strategy;
export declare class AdminStrategy extends AdminStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: any): Promise<{
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
export {};
