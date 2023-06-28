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
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const Project_dto_1 = require("./dto/Project.dto");
const projects_service_1 = require("./projects.service");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let ProjectsController = class ProjectsController {
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    async create(req, data) {
        return this.projectsService.createProject(req.user.id, data);
    }
    async findAll() {
        return this.projectsService.getAllProjects();
    }
    async findOne(projectId) {
        return this.projectsService.getProjectById(projectId);
    }
    async update(projectId, data) {
        return this.projectsService.updateProject(projectId, data);
    }
    async delete(projectId) {
        return this.projectsService.deleteProject(projectId);
    }
    async filter(data) {
        return this.projectsService.filterProject(data);
    }
    async approve(token, data) {
        console.log(data.status);
        if (data.status != "Approved" && data.status != "Reproved") {
            return { error: "Invalid status" };
        }
        return this.projectsService.approveProject(token, data.status, data.feedback);
    }
    async cancel(req, projectId) {
        return this.projectsService.cancelProject(projectId, req.user.id);
    }
    async blocking(projectId, data) {
        if (typeof (data.status) != "boolean") {
            return { error: "Invalid status" };
        }
        return this.projectsService.receivingSubscription(projectId, data.status);
    }
    async finalize(projectId, req) {
        return this.projectsService.finalizeProject(projectId, req.user.id);
    }
};
__decorate([
    (0, swagger_1.ApiHeader)({
        name: 'createProject',
        description: 'create a new project',
    }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)("/create"),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Error: Conflict' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Error: Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 422, description: 'Error: Unprocessable Entity' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Error: Unauthorized' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Project_dto_1.ProjectDTO]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: 'findAll',
        description: 'search for all projects',
    }),
    (0, common_1.Get)("/findAll"),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Error: Not Found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Error: Bad Request' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("/findByID/:projectId"),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Error: Not Found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Error: Bad Request' }),
    __param(0, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)("/update/:projectId"),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Error: Not Found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Error: Bad Request' }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("/delete/:projectId"),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Error: Not Found' }),
    __param(0, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: 'filter',
        description: 'filter projects',
    }),
    (0, common_1.Post)("/filter"),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Error: Bad Request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "filter", null);
__decorate([
    (0, common_1.Put)("/approve/:token"),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Error: Forbidden' }),
    __param(0, (0, common_1.Param)("token")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "approve", null);
__decorate([
    (0, common_1.Put)("/cancel/:projectId"),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Error: Not Found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Error: Forbidden' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "cancel", null);
__decorate([
    (0, common_1.Put)("/Blocked/:projectId"),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Error: Not Found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Error: Forbidden' }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "blocking", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Put)("/Finalize/:projectId"),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error: Internal Server Error' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Error: Not Found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Error: Forbidden' }),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "finalize", null);
ProjectsController = __decorate([
    (0, swagger_1.ApiTags)('Project'),
    (0, common_1.Controller)('Project'),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
exports.ProjectsController = ProjectsController;
//# sourceMappingURL=projects.controller.js.map