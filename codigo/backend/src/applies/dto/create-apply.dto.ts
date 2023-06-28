import { IsString } from "class-validator";
////////////////////////////////////////////////////////////////////////////////

export class CreateApplyDto {
    @IsString()
    projectId: string;
    
    @IsString()
    offerName: string;

    @IsString()
    why: string;

    @IsString()
    habilities: string;

    @IsString()
    userId: string;
}