"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const CreateUser_dto_1 = require("./dto/CreateUser.dto");
const exceptions_1 = require("@nestjs/common/exceptions");
const resetPassword_dto_1 = require("./dto/resetPassword.dto");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(data) {
        return this.usersService.create(data);
    }
    async update(id, data) {
        if (!id) {
            throw new exceptions_1.BadRequestException("Something bad happened", { cause: new Error(), description: "ID must be included" });
        }
        if (typeof id == "string") {
            return this.usersService.update(id, data);
        }
        else {
            throw new exceptions_1.BadRequestException("Something bad happened", { cause: new Error(), description: "ID must be a string" });
        }
    }
    async getOne(id) {
        if (typeof id === "string") {
            return this.usersService.getOne(id);
        }
        else {
            throw new exceptions_1.BadRequestException("Something bad happened", { cause: new Error(), description: "ID must be a string" });
        }
    }
    async getUser(req) {
        console.log(req.user);
        return this.usersService.getUser(req.user.id);
    }
    async getAll() {
        return this.usersService.getAll();
    }
    async Auth() {
        return "Authenticated";
    }
    async getByName(name) {
        if (typeof name === "string") {
            return this.usersService.getUserByName(name);
        }
        else {
            throw new exceptions_1.BadRequestException("Something Bad Happened", { cause: new Error(), description: "Name must be a String" });
        }
    }
    async delete(id) {
        if (typeof id === "string") {
            return this.usersService.delete(id);
        }
        else {
            throw new exceptions_1.BadRequestException("Something Bad Happened", { cause: new Error(), description: "ID must be a String" });
        }
    }
    async sendForgotEmail(email) {
        if (typeof email === "string") {
            return this.usersService.sendForgotPasswordEmail(email);
        }
        else {
            throw new exceptions_1.BadRequestException("Something Bad Happened", { cause: new Error(), description: "Email must be a String" });
        }
    }
    async resetPassword(data) {
        return this.usersService.resetPassword(data);
    }
    async addHigh(data, req) {
        return this.usersService.addHighligth(req.user.id, data.highlight);
    }
    async getRank(req) {
        return this.usersService.getRanking(req.user.id);
    }
};
__decorate([
    (0, swagger_1.ApiHeader)({
        name: 'createUser',
        description: 'Create a new user',
    }),
    (0, common_1.Post)("/Create"),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Error: Conflict' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Error: Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 422, description: 'Error: Unprocessable Entity' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUser_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Put)("/Update/:id"),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Error: Not Found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Error: Conflict' }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)("/Info/:id"),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Error: Not Found' }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getOne", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)("/Info"),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Error: Not Found' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: 'getAll',
        description: 'Get all users',
    }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)("/getAll"),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: 'Auth',
        description: 'User authentication',
    }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)("/Auth"),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Error: Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Error: Not Found' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "Auth", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)("/getByName/:name"),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    __param(0, (0, common_1.Param)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getByName", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)("/Delete/:id"),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Error: Not Found' }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)("/sendForgotEmail/:email"),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    __param(0, (0, common_1.Param)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "sendForgotEmail", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: 'resetForgotPassword',
        description: 'Create new password',
    }),
    (0, common_1.Post)("/resetForgotPassword"),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Error: Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resetPassword_dto_1.ResetPasswordDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)("/addHighlight"),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Error: Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addHigh", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)("/ranking"),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Error: Unauthorized' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getRank", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('User'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map