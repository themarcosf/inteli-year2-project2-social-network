/** nestjs */
import {
  Controller,
  Get,
  Post as NestPost,
  Body,
  Param,
  Delete,
  UseGuards,
  Headers,
  Put,
} from "@nestjs/common";

/** providers */
import { CreateApplyDto } from "./dto/create-apply.dto";;
import { AuthGuard } from "src/user/guards/auth.guard";
import { ApplyService } from "./apply.service";

////////////////////////////////////////////////////////////////////////////////

@Controller("apply")
export class ApplyController {
  constructor(private readonly applyService: ApplyService) { }

  // @UseGuards(AuthGuard)
  @NestPost()
  async create(@Headers() headers: any, @Body() applyData: CreateApplyDto) {
    return this.applyService.create(headers, applyData);
  }

  // @UseGuards(AuthGuard)
  @Get("/projects/:projectId")
  async getApplyByProjectId(
    @Param("projectId") projectId: string,
    @Headers() headers: any
  ) {
    return this.applyService.getApplyByProjectId(projectId, headers);
  }

  // @UseGuards(AuthGuard)
  @Get("/users/:userId")
  async getApplyByUserId(
    @Param("userId") userId: string,
    @Headers() headers: any
  ) {
    return this.applyService.getApplyByUserId(userId, headers);
  }

  // @UseGuards(AuthGuard)
  @Put("update/:id")
  async update(
    @Param("id") id,
    @Body() applyData: CreateApplyDto,
    @Headers() headers
  ) {
    this.applyService.update(id, applyData, headers);
  }

  // @UseGuards(AuthGuard)
  @Delete("delete/:id")
  async delete(@Param("id") id: string, @Headers() headers: any) {
    return this.applyService.delete(id, headers);
  }

  // @UseGuards(AuthGuard)
  @Put("updateFeedback/:id")
  async updateFeedback(
    @Param("id") id: string,
    @Body() applyData: any,
    @Headers() headers: any
  ) {
    return this.applyService.updateFeedback(id, applyData, headers);
  }

  // @UseGuards(AuthGuard)
  @Get("/approve/:id")
  async approve(@Param("id") id: string, @Headers() headers: any) {
    this.applyService.approve(id, headers)
  }

  // @UseGuards(AuthGuard)
  @NestPost("/getApplyByUser")
  async getApply(@Body() applyData: any, @Headers() headers) {
    this.applyService.getApply(applyData, headers)
  }
}
