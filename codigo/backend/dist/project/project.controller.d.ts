import { Project } from "./entities/project.entity";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { HttpService } from "@nestjs/axios";
export declare class ProjectController {
    private readonly httpService;
    private projects;
    constructor(httpService: HttpService);
    create(createProjectDto: CreateProjectDto, config: any): Promise<Project>;
    findAll(): Project[];
    findOne(id: string): Project;
    update(id: string, updateProjectDto: UpdateProjectDto): Project;
    remove(id: string): void;
}
