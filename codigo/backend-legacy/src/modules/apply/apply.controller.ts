import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApplyService } from './apply.service';
import { createApplyDTO } from './DTOs/createApply.dto';
import { ApiTags, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { get } from 'http';

@ApiTags('Apply')
@Controller('Apply')
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  //api header
  @ApiHeader({
    name: 'apply',
    description: 'This route is for the user to apply for a project',
  })
  @Post('/create')
  //possible error responses
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 409, description: 'Error: Conflict'})
  @ApiResponse({ status: 400, description: 'Error: Bad Request'})
  @ApiResponse({ status: 422, description: 'Error: Unprocessable Entity'})
  async apply(@Body() data: createApplyDTO) {
    return await this.applyService.apply(data);
  }

  //api header
  @ApiHeader({
    name: 'projectId',
    description: 'Search project by project id',
  })
  @Get('/projects/:projectId')
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 404, description: 'Error: Not Found'})
  @ApiResponse({ status: 400, description: 'Error: Bad Request'})
  async getApplyByProjectId(@Param("userId") projectId: string) {
    return await this.applyService.getApplyByProjectId(projectId);
  }

  //api header
  @ApiHeader({
    name: 'userId',
    description: 'Search project by user id',
  })
  @Get('/users/:userId')
  //possible error responses
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 404, description: 'Error: Not Found'})
  @ApiResponse({ status: 400, description: 'Error: Bad Request'})
  async getApplyByUserId(@Param("userId") userId: string) {
    return await this.applyService.getApplyByUserId(userId);
  }

  //api header
  @ApiHeader({
    name: 'daleteId',
    description: 'Delete the subscription to the project',
  })
  @Delete('/delete/:id')
  //possible error responses
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 404, description: 'Error: Not Found'})
  async deleteApply(@Param("id") id: string) {
    return await this.applyService.deleteApply(id);
  }

  @Put('/update/:id')
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  async updateApply(@Param("id") id: string, @Body() data: createApplyDTO) {
    return await this.applyService.updateApply(id, data);
  }

  @Put('/updateFeedback/:id')
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  async updateFeedback(@Param("id") id: string, @Body() data: any) {
    return await this.applyService.createFeedback(id, data.feedback, data.status);
  }

  @Get('/approve/:id')
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  async approve(@Param("id") id: string) {
    return await this.applyService.approveApply(id);
  }

  @Post('/getApplyByUser')
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  async getApply(@Body() data: any) {
    return await this.applyService.getApplyById(data.projectId, data.userId);
  }
}
