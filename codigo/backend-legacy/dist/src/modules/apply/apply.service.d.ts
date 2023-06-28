import { PrismaService } from '../../prisma.service';
import { createApplyDTO } from './DTOs/createApply.dto';
export declare class ApplyService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    apply(infos: createApplyDTO): Promise<string>;
    getApplyByProjectId(projectId: string): Promise<import(".prisma/client").Apply[]>;
    getApplyByUserId(userId: string): Promise<(import(".prisma/client").Project & {
        applies: import(".prisma/client").Apply[];
    })[]>;
    deleteApply(id: string): Promise<string>;
    updateApply(id: string, data: any): Promise<string>;
    createFeedback(id: string, feedback: string, status: string): Promise<string>;
    approveApply(id: string): Promise<void>;
    getApplyById(projectId: string, userId: string): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Apply[]>;
}
