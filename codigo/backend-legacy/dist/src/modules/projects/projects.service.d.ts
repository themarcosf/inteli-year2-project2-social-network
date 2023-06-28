import { PrismaService } from 'src/prisma.service';
import { ProjectDTO } from './dto/Project.dto';
export declare class ProjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    createProject(ownerId: string, data: ProjectDTO): Promise<any>;
    getAllProjects(): Promise<(import(".prisma/client").Project & {
        applies: import(".prisma/client").Apply[];
    })[]>;
    getProjectById(projectId: string): Promise<import(".prisma/client").Project & {
        applies: (import(".prisma/client").Apply & {
            user: import(".prisma/client").User;
        })[];
    }>;
    updateProject(projectId: string, data: any): Promise<any>;
    deleteProject(projectId: string): Promise<import(".prisma/client").Project>;
    filterProject(data: any): Promise<(import(".prisma/client").Project & {
        applies: import(".prisma/client").Apply[];
    })[]>;
    approveProject(token: string, status: string, feedback: string): Promise<any>;
    cancelProject(projectId: string, id: string): Promise<import(".prisma/client").Project>;
    receivingSubscription(projectId: string, blocked: boolean): Promise<import(".prisma/client").Project>;
    finalizeProject(projectId: string, id: string): Promise<void>;
}
