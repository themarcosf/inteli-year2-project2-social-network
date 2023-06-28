import { ProjectDTO } from './dto/Project.dto';
import { ProjectsService } from './projects.service';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(req: any, data: ProjectDTO): Promise<any>;
    findAll(): Promise<(import(".prisma/client").Project & {
        applies: import(".prisma/client").Apply[];
    })[]>;
    findOne(projectId: string): Promise<import(".prisma/client").Project & {
        applies: (import(".prisma/client").Apply & {
            user: import(".prisma/client").User;
        })[];
    }>;
    update(projectId: string, data: any): Promise<any>;
    delete(projectId: string): Promise<import(".prisma/client").Project>;
    filter(data: any): Promise<(import(".prisma/client").Project & {
        applies: import(".prisma/client").Apply[];
    })[]>;
    approve(token: string, data: any): Promise<any>;
    cancel(req: any, projectId: string): Promise<import(".prisma/client").Project>;
    blocking(projectId: string, data: any): Promise<import(".prisma/client").Project | {
        error: string;
    }>;
    finalize(projectId: string, req: any): Promise<void>;
}
