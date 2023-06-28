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
exports.ApplyController = void 0;
const common_1 = require("@nestjs/common");
const apply_service_1 = require("./apply.service");
const createApply_dto_1 = require("./DTOs/createApply.dto");
const swagger_1 = require("@nestjs/swagger");
let ApplyController = class ApplyController {
    constructor(applyService) {
        this.applyService = applyService;
    }
    async apply(data) {
        return await this.applyService.apply(data);
    }
    async getApplyByProjectId(projectId) {
        return await this.applyService.getApplyByProjectId(projectId);
    }
    async getApplyByUserId(userId) {
        return await this.applyService.getApplyByUserId(userId);
    }
    async deleteApply(id) {
        return await this.applyService.deleteApply(id);
    }
    async updateApply(id, data) {
        return await this.applyService.updateApply(id, data);
    }
    async updateFeedback(id, data) {
        return await this.applyService.createFeedback(id, data.feedback, data.status);
    }
    async approve(id) {
        return await this.applyService.approveApply(id);
    }
    async getApply(data) {
        return await this.applyService.getApplyById(data.projectId, data.userId);
    }
};
__decorate([
    (0, swagger_1.ApiHeader)({
        name: 'apply',
        description: 'This route is for the user to apply for a project',
    }),
    (0, common_1.Post)('/create'),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Error: Conflict' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Error: Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 422, description: 'Error: Unprocessable Entity' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createApply_dto_1.createApplyDTO]),
    __metadata("design:returntype", Promise)
], ApplyController.prototype, "apply", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: 'projectId',
        description: 'Search project by project id',
    }),
    (0, common_1.Get)('/projects/:projectId'),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Error: Not Found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Error: Bad Request' }),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplyController.prototype, "getApplyByProjectId", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: 'userId',
        description: 'Search project by user id',
    }),
    (0, common_1.Get)('/users/:userId'),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Error: Not Found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Error: Bad Request' }),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplyController.prototype, "getApplyByUserId", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: 'daleteId',
        description: 'Delete the subscription to the project',
    }),
    (0, common_1.Delete)('/delete/:id'),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Error: Not Found' }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplyController.prototype, "deleteApply", null);
__decorate([
    (0, common_1.Put)('/update/:id'),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createApply_dto_1.createApplyDTO]),
    __metadata("design:returntype", Promise)
], ApplyController.prototype, "updateApply", null);
__decorate([
    (0, common_1.Put)('/updateFeedback/:id'),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ApplyController.prototype, "updateFeedback", null);
__decorate([
    (0, common_1.Get)('/approve/:id'),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplyController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)('/getApplyByUser'),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApplyController.prototype, "getApply", null);
ApplyController = __decorate([
    (0, swagger_1.ApiTags)('Apply'),
    (0, common_1.Controller)('Apply'),
    __metadata("design:paramtypes", [apply_service_1.ApplyService])
], ApplyController);
exports.ApplyController = ApplyController;
//# sourceMappingURL=apply.controller.js.map