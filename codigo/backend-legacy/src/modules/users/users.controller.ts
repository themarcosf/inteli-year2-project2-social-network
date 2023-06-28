import { Body, Controller, Post, Get, Param, Req, Delete, Put, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { BadRequestException } from '@nestjs/common/exceptions';
import { LoginDTO } from './dto/Login.dto';
import { Request, Response, NextFunction } from 'express';
import { ResetPasswordDTO } from './dto/resetPassword.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiResponse, ApiHeader } from '@nestjs/swagger';

@ApiTags('User')
@Controller('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiHeader({
    name: 'createUser',
    description: 'Create a new user',
  })
  @Post("/Create")
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 409, description: 'Error: Conflict'})
  @ApiResponse({ status: 400, description: 'Error: Bad Request'})
  @ApiResponse({ status: 422, description: 'Error: Unprocessable Entity'})
  async create(@Body() data: CreateUserDTO) {
    return this.usersService.create(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put("/Update/:id")
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 404, description: 'Error: Not Found'})
  @ApiResponse({ status: 409, description: 'Error: Conflict'})
  async update(@Param("id") id: string, @Body() data: any) {
    if(!id) {
      throw new BadRequestException("Something bad happened", {cause: new Error(), description: "ID must be included"})
    }
    
    if (typeof id == "string") {
      return this.usersService.update(id, data)
    } else {
      throw new BadRequestException("Something bad happened", {cause: new Error(), description: "ID must be a string"})
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("/Info/:id")
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 404, description: 'Error: Not Found'})
  async getOne(@Param("id") id: string) {
    if (typeof id === "string") {
      return this.usersService.getOne(id);
    } else {
      throw new BadRequestException("Something bad happened", {cause: new Error(), description: "ID must be a string"});
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("/Info")
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 404, description: 'Error: Not Found'})
  async getUser(@Req() req:any) {
    console.log(req.user)
    return this.usersService.getUser(req.user.id)
  }

  @ApiHeader({
    name: 'getAll',
    description: 'Get all users',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get("/getAll")
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  async getAll() {
    return this.usersService.getAll();
  }

  @ApiHeader({
    name: 'Auth',
    description: 'User authentication',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get("/Auth")
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 401, description: 'Error: Unauthorized'})
  @ApiResponse({ status: 404, description: 'Error: Not Found'})
  async Auth() {
    return "Authenticated"
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("/getByName/:name")
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  async getByName(@Param("name") name: string) {
    if(typeof name === "string") {
      return this.usersService.getUserByName(name);
    } else {
      throw new BadRequestException("Something Bad Happened", {cause: new Error(), description: "Name must be a String"})
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete("/Delete/:id")
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 404, description: 'Error: Not Found'})
  async delete(@Param("id") id: string) {
    if(typeof id === "string") {
      return this.usersService.delete(id);
    } else {
      throw new BadRequestException("Something Bad Happened", {cause: new Error(), description: "ID must be a String"})
    }
  }

  @Get("/sendForgotEmail/:email")
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  async sendForgotEmail(@Param("email") email: string) {
    if(typeof email === "string") {
      return this.usersService.sendForgotPasswordEmail(email);
    } else {
      throw new BadRequestException("Something Bad Happened", {cause: new Error(), description: "Email must be a String"})
    }
  }

  @ApiHeader({
    name: 'resetForgotPassword',
    description: 'Create new password',
  })
  @Post("/resetForgotPassword")
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 401, description: 'Error: Unauthorized'})
  async resetPassword(@Body() data: ResetPasswordDTO) {
    return this.usersService.resetPassword(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post("/addHighlight")
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 401, description: 'Error: Unauthorized'})
  async addHigh(@Body() data: any, @Req() req: any) {
    return this.usersService.addHighligth(req.user.id, data.highlight);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("/ranking")
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 401, description: 'Error: Unauthorized'})
  async getRank(@Req() req: any) {
    return this.usersService.getRanking(req.user.id);
  }
}
