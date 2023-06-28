import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { firstValueFrom } from "rxjs";
import { Apply } from "./entities/apply.entity";
import { CreateApplyDto } from "./dto/create-apply.dto";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class ApplyService {
  constructor(
    // @InjectRepository(Apply) private readonly repository: Repository<Apply>,
    // private readonly queryRunner: QueryRunnerFactory,
    private readonly httpService: HttpService
  ) {}

  async create(headers: any, applyData: CreateApplyDto): Promise<Apply> {
    const token = headers.authorization;
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const { data } = await firstValueFrom(
      this.httpService.post(
        "http://localhost:3001/Apply/create",
        applyData,
        config
      )
    );
    return data;
  }

  async getApplyByProjectId(projectId: string, headers: any) {
    const token = headers.authorization;
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const { data } = await firstValueFrom(
      this.httpService.get(
        `http://localhost:3001/Apply/projects/${projectId}`,
        config
      )
    );
    return data;
  }

  async getApplyByUserId(userId: string, headers: any) {
    const token = headers.authorization;
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const { data } = await firstValueFrom(
      this.httpService.get(
        `http://localhost:3001/Apply/users/${userId}`,
        config
      )
    );
    return data;
  }

  async update(id: string, applyData: CreateApplyDto, headers: any) {
    const token = headers.authorization;
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const { data } = await firstValueFrom(
      this.httpService.put(
        `http://localhost:3001/Apply/update/${id}`,
        applyData,
        config
      )
    );
    return data;
  }

  async delete(id: string, headers: any) {
    const token = headers.authorization;
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const { data } = await firstValueFrom(
      this.httpService.delete(
        `http://localhost:3001/Apply/delete/${id}`,
        config
      )
    );
    return data;
  }

  async updateFeedback(id: string, applyData: any, headers: any) {
    const token = headers.authorization;
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const { data } = await firstValueFrom(
      this.httpService.put(
        `http://localhost:3001/Apply/updateFeedback/${id}`,
        {
          feedback: applyData.feedback,
          status: applyData.status,
        },
        config
      )
    );
    return data;
  }

  async approve(id: string, headers: any) {
    const token = headers.authorization;
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const { data } = await firstValueFrom(
      this.httpService.get(`http://localhost:3001/Apply/approve/${id}`, config)
    );
    return data;
  }

  async getApply(applyData: any, headers: any) {
    const token = headers.authorization;
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const { data } = await firstValueFrom(
      this.httpService.post(
        `http://localhost:3001/Apply/getApplyByUser`,
        {
          projectId: applyData.projectId,
          userId: applyData.userId,
        },
        config
      )
    );
    return data;
  }
}
