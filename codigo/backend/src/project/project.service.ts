import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QueryRunnerFactory } from "../commom/queryRunner/query-runner.factory";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";


@Injectable()
export class ProjectService {
    constructor(
        private readonly httpService: HttpService
    ) { }

    async create(headers, projectData: CreateProjectDto) {
        const token = headers.authorization
        const config = {
            headers: {
                "Authorization": token
            }
        }
        const { data } = await firstValueFrom(
            this.httpService.post("http://localhost:3001/Project/Create", projectData, config)
        );
        return data;
    }

    async update(projectId, headers, projectData: UpdateProjectDto) {
        const token = headers.authorization
        const config = {
            headers: {
                "Authorization": token
            }
        }
        const { data } = await firstValueFrom(
            this.httpService.put(`http://localhost:3001/Project/update/${projectId}`, projectData, config)
        );
        return data;
    }

    async delete(projectId, headers) {
        const token = headers.authorization
        const config = {
            headers: {
                "Authorization": token
            }
        }
        const { data } = await firstValueFrom(
            this.httpService.delete(`http://localhost:3001/Project/delete/${projectId}`, config)
        );
        return data;
    }

    async getAll(headers) {
        const token = headers.authorization
        console.log(token)
        const config = {
            headers: {
                "Authorization": token
            }
        }
        const { data } = await firstValueFrom(
            this.httpService.get(`http://localhost:3001/Project/findAll`, config)
        );
        return data;
    }

    async getOne(projectId, Headers) {
        const token = Headers.authorization
        const config = {
            headers: {
                "Authorization": token
            }
        }
        const { data } = await firstValueFrom(
            this.httpService.get(`http://localhost:3001/Project/findByID/${projectId}`, config)
        );
        return data;
    }

    async filter(headers, projectData: any) {
        const token = headers.authorization
        const config = {
            headers: {
                "Authorization": token
            }
        }
        const { data } = await firstValueFrom(
            this.httpService.post(`http://localhost:3001/Project/filter`, projectData, config)
        );
        return data;
    }

    async finalize(projectId, req: any) {
        const token = req.headers.authorization
        const config = {
            headers: {
                "Authorization": token
            }
        }
        const { data } = await firstValueFrom(
            this.httpService.put(`http://localhost:3001/Project/finalize/${projectId}`, {}, config)
        );
        return data;
    }

}