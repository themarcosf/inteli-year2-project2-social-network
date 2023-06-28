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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const exceptions_1 = require("@nestjs/common/exceptions");
const uuid_1 = require("uuid");
let ApplyService = class ApplyService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async apply(infos) {
        const project = await this.prisma.project.findUnique({
            where: {
                projectId: infos.projectId,
            },
        });
        if (!project) {
            throw new exceptions_1.BadRequestException('Something bad happened', {
                cause: new Error(),
                description: 'Project does not exist',
            });
        }
        if (project.status !== 'Approved') {
            throw new exceptions_1.BadRequestException('Something bad happened', {
                cause: new Error(),
                description: 'Project is not approved',
            });
        }
        let roles = 0;
        JSON.parse(project.roles).map((role) => {
            console.log(role.vacancies);
            roles += role.vacancies;
        });
        const applies = await this.prisma.apply.findMany({
            where: {
                projectId: infos.projectId,
            },
        });
        if (applies.length >= roles) {
            throw new exceptions_1.BadRequestException('Something bad happened', {
                cause: new Error(),
                description: 'Project is full',
            });
        }
        const user = await this.prisma.user.findUnique({
            where: {
                id: infos.userId,
            },
        });
        if (!user) {
            throw new exceptions_1.BadRequestException('Something bad happened', {
                cause: new Error(),
                description: 'User does not exist',
            });
        }
        const alreadyApplied = await this.prisma.apply.findMany({
            where: {
                userId: infos.userId,
                projectId: infos.projectId,
            },
        });
        if (alreadyApplied.length > 0) {
            throw new exceptions_1.BadRequestException('Something bad happened', {
                cause: new Error(),
                description: 'Application already exists',
            });
        }
        let offerExists = false;
        JSON.parse(project.roles).map((role) => {
            if (role.role === infos.offerName) {
                offerExists = true;
            }
        });
        if (!offerExists) {
            throw new exceptions_1.BadRequestException('Something bad happened', {
                cause: new Error(),
                description: 'Offer does not exist',
            });
        }
        try {
            await this.prisma.apply.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    userId: infos.userId,
                    projectId: infos.projectId,
                    offerName: infos.offerName,
                    why: infos.why,
                    habilities: infos.habilities,
                },
            });
        }
        catch (err) {
            throw new exceptions_1.InternalServerErrorException('Something bad happened', {
                cause: new Error(),
                description: err,
            });
        }
        return 'Application created successfully';
    }
    async getApplyByProjectId(projectId) {
        const apply = await this.prisma.apply.findMany({
            where: {
                projectId,
            },
        });
        return apply;
    }
    async getApplyByUserId(userId) {
        const apply = await this.prisma.apply.findMany({
            where: {
                userId,
                status: 'Approved',
            },
        });
        const projects = await this.prisma.project.findMany({
            where: {
                projectId: {
                    in: apply.map((apply) => apply.projectId),
                },
            },
            include: {
                applies: true
            },
        });
        return projects;
    }
    async deleteApply(id) {
        const applyExists = await this.prisma.apply.findUnique({
            where: {
                id,
            },
        });
        if (!applyExists) {
            throw new exceptions_1.BadRequestException('Something bad happened', {
                cause: new Error(),
                description: 'Application does not exist',
            });
        }
        if (applyExists.status === 'Approved') {
            const project = await this.prisma.project.findUnique({
                where: {
                    projectId: applyExists.projectId,
                },
            });
            let newRoles = JSON.parse(project.roles).map((role) => {
                if (role.role === applyExists.offerName) {
                    role.vacancies = Number(role.vacancies);
                    role.vacancies += 1;
                    role.vacancies = String(role.vacancies);
                }
                return role;
            });
            try {
                await this.prisma.project.update({
                    where: {
                        projectId: applyExists.projectId,
                    },
                    data: {
                        roles: JSON.stringify(newRoles),
                    },
                });
            }
            catch (err) {
                throw new exceptions_1.InternalServerErrorException('Something bad happened', { cause: new Error(), description: err });
            }
        }
        try {
            await this.prisma.apply.delete({
                where: {
                    id,
                },
            });
        }
        catch (err) {
            throw new exceptions_1.InternalServerErrorException('Something bad happened', {
                cause: new Error(),
                description: err,
            });
        }
        return 'Application deleted successfully';
    }
    async updateApply(id, data) {
        const applyExists = await this.prisma.apply.findUnique({
            where: {
                id,
            },
        });
        if (!applyExists) {
            throw new exceptions_1.BadRequestException('Something bad happened', {
                cause: new Error(),
                description: 'Application does not exist',
            });
        }
        try {
            await this.prisma.apply.update({
                data,
                where: {
                    id: id,
                },
            });
        }
        catch (err) {
            throw new exceptions_1.InternalServerErrorException('Something bad happened', {
                cause: new Error(),
                description: err,
            });
        }
        return 'Application updated successfully';
    }
    async createFeedback(id, feedback, status) {
        const applyExists = await this.prisma.apply.findUnique({
            where: {
                id,
            },
        });
        if (!applyExists) {
            throw new exceptions_1.BadRequestException('Something bad happened', { cause: new Error(), description: 'Application does not exist' });
        }
        if (applyExists.status === 'Approved') {
            console.log("entrou");
            const project = await this.prisma.project.findUnique({
                where: {
                    projectId: applyExists.projectId,
                },
            });
            let newRoles = JSON.parse(project.roles).map((role) => {
                if (role.role === applyExists.offerName) {
                    role.vacancies = Number(role.vacancies);
                    role.vacancies += 1;
                    role.vacancies = String(role.vacancies);
                }
                return role;
            });
            try {
                await this.prisma.project.update({
                    where: {
                        projectId: applyExists.projectId,
                    },
                    data: {
                        roles: JSON.stringify(newRoles),
                    },
                });
            }
            catch (err) {
                throw new exceptions_1.InternalServerErrorException('Something bad happened', { cause: new Error(), description: err });
            }
        }
        if (feedback) {
            try {
                await this.prisma.apply.update({
                    data: {
                        status: status,
                        feedback: feedback,
                    },
                    where: {
                        id: id,
                    },
                });
            }
            catch (err) {
                throw new exceptions_1.InternalServerErrorException('Something bad happened', { cause: new Error(), description: err });
            }
        }
        else {
            try {
                await this.prisma.apply.update({
                    data: {
                        status: status,
                    },
                    where: {
                        id: id,
                    },
                });
            }
            catch (err) {
                throw new exceptions_1.InternalServerErrorException('Something bad happened', { cause: new Error(), description: err });
            }
        }
        return 'Status changed successfully';
    }
    async approveApply(id) {
        const applyExists = await this.prisma.apply.findUnique({
            where: {
                id,
            },
        });
        if (!applyExists) {
            throw new exceptions_1.BadRequestException('Something bad happened', { cause: new Error(), description: 'Application does not exist' });
        }
        const project = await this.prisma.project.findUnique({
            where: {
                projectId: applyExists.projectId,
            },
        });
        let newRoles = JSON.parse(project.roles).map((role) => {
            if (role.role === applyExists.offerName) {
                role.vacancies -= 1;
                role.vacancies = String(role.vacancies);
            }
            return role;
        });
        try {
            await this.prisma.project.update({
                where: {
                    projectId: applyExists.projectId,
                },
                data: {
                    roles: JSON.stringify(newRoles),
                },
            });
        }
        catch (err) {
            throw new exceptions_1.InternalServerErrorException('Something bad happened', { cause: new Error(), description: err });
        }
        try {
            await this.prisma.apply.update({
                data: {
                    status: "Approved",
                },
                where: {
                    id: id,
                },
            });
        }
        catch (err) {
            throw new exceptions_1.InternalServerErrorException('Something bad happened', { cause: new Error(), description: err });
        }
    }
    getApplyById(projectId, userId) {
        const isApplied = this.prisma.apply.findMany({
            where: {
                projectId: projectId,
                userId: userId
            },
        });
        return isApplied;
    }
};
ApplyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApplyService);
exports.ApplyService = ApplyService;
//# sourceMappingURL=apply.service.js.map