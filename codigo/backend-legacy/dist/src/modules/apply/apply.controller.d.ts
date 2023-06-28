import { ApplyService } from './apply.service';
import { createApplyDTO } from './DTOs/createApply.dto';
export declare class ApplyController {
    private readonly applyService;
    constructor(applyService: ApplyService);
    apply(data: createApplyDTO): Promise<string>;
    getApplyByProjectId(projectId: string): Promise<import(".prisma/client").Apply[]>;
    getApplyByUserId(userId: string): Promise<(import(".prisma/client").Project & {
        applies: import(".prisma/client").Apply[];
    })[]>;
    deleteApply(id: string): Promise<string>;
    updateApply(id: string, data: createApplyDTO): Promise<string>;
    updateFeedback(id: string, data: any): Promise<string>;
    approve(id: string): Promise<void>;
    getApply(data: any): Promise<import(".prisma/client").Apply[]>;
}
