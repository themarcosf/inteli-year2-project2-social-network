/** nestjs */
import {
  Controller,
  Get,
  Post as NestPost,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Headers,
  Put,
  Header,
} from "@nestjs/common";

/** providers */
import { Project } from "./entities/project.entity";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { AuthGuard } from "../user/guards/auth.guard";
import { ProjectService } from "./project.service";

////////////////////////////////////////////////////////////////////////////////

@Controller("project")
export class ProjectController {
  private projects: Project[] = [];

  constructor(private readonly projectService: ProjectService) {

  }

  // @UseGuards(AuthGuard)
  @NestPost()
  async create(@Headers() headers, @Body() projectData: CreateProjectDto) {
    return this.projectService.create(headers, projectData)
  }

  // @UseGuards(AuthGuard)
  @Put("update/:projectId")
  async update(@Param("projectId") projectId, @Headers() headers, @Body() projectData: UpdateProjectDto) {
    return this.projectService.update(projectId, headers, projectData)
  }

  // @UseGuards(AuthGuard)
  @Delete("delete/:projectId")
  async delete(@Param("projectId") projectId, @Headers() headers) {
    return this.projectService.delete(projectId, headers)
  }

  // @UseGuards(AuthGuard)
  @Get("/allProjects")
  async getAll(@Headers() headers) {
    return this.projectService.getAll(headers)
  }

  // @UseGuards(AuthGuard)
  @Get("/:projectId")
  async getOne(@Param("projectId") projectId, @Headers() Headers) {
    return this.projectService.getOne(projectId, Headers)
  }

  // @UseGuards(AuthGuard)
  @NestPost("/filterProjects")
  async filter(@Headers() headers, @Body() projectData: any) {
    return this.projectService.filter(headers, projectData)
  }

  // @UseGuards(AuthGuard)
  @Put("/finalize/:projectId")
  async finalize(@Param("projectId") projectId, @Req() req: any) {
    return this.projectService.finalize(projectId, req)
  }

}