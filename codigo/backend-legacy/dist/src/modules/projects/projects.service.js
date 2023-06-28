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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const uuid_1 = require("uuid");
const nodemailer = require("nodemailer");
const SMTPconfig_1 = require("../../Common/SMTP/SMTPconfig");
const htmlSendApprove_1 = require("../../Common/SMTP/HTML/htmlSendApprove");
const jwt = require("jsonwebtoken");
const transporter = nodemailer.createTransport({
    host: SMTPconfig_1.smtpConfig.host,
    port: SMTPconfig_1.smtpConfig.port,
    secure: false,
    auth: {
        user: SMTPconfig_1.smtpConfig.user,
        pass: SMTPconfig_1.smtpConfig.pass
    },
    tls: {
        rejectUnauthorized: false
    }
});
let ProjectsService = class ProjectsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createProject(ownerId, data) {
        let projectExists = await this.prisma.project.findMany({
            where: {
                name: data.name,
            }
        });
        if (projectExists.length > 0) {
            throw new common_1.BadRequestException("Something bad happened", { cause: new Error(), description: "Project already exists" });
        }
        let project;
        try {
            if (data.coleaderId != null && data.coleaderId != undefined && data.coleaderId != "") {
                project = await this.prisma.project.create({
                    data: {
                        projectId: (0, uuid_1.v4)(),
                        name: data.name,
                        start: data.start,
                        end: data.end,
                        tags: data.tags,
                        endSubscription: data.endSubscription,
                        badge: data.badge,
                        roles: data.roles,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        description: data.description,
                        coleaderId: data.coleaderId,
                        ownerId: ownerId,
                        blockedSubscription: true,
                        status: "Pending"
                    }
                });
            }
            else {
                project = await this.prisma.project.create({
                    data: {
                        projectId: (0, uuid_1.v4)(),
                        name: data.name,
                        start: new Date(),
                        end: new Date(),
                        tags: data.tags,
                        endSubscription: data.endSubscription,
                        badge: data.badge,
                        roles: data.roles,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        description: data.description,
                        ownerId: ownerId,
                        blockedSubscription: true,
                        status: "Pending"
                    }
                });
            }
        }
        catch (err) {
            console.log(err);
            throw new common_1.InternalServerErrorException("Something bad happened", { cause: new Error(), description: err });
        }
        const person = await this.prisma.user.findUnique({
            where: {
                id: ownerId,
            }
        });
        const managerId = person.managerId;
        let email = "";
        let name = "";
        if (!managerId.includes("@")) {
            const manager = await this.prisma.user.findUnique({
                where: {
                    id: managerId,
                }
            });
            email = manager.email;
            name = manager.name;
        }
        else {
            email = managerId;
            name = "Manager";
        }
        const token = jwt.sign({ sub: project.projectId }, process.env.JWT_APPROVE);
        try {
            const emailSent = await transporter.sendMail({
                from: '"NoReply DELLPROJECTS" <noreply@dellprojects.com>',
                to: email,
                subject: "Reset Password",
                html: (0, htmlSendApprove_1.htmlApprove)(name, token, project.projectId)
            });
            console.log("Message sent: ", emailSent.messageId);
        }
        catch (err) {
            throw new common_1.InternalServerErrorException("Something bad happened", { cause: new Error(), description: err });
        }
        return project;
    }
    async getAllProjects() {
        try {
            const allProjects = await this.prisma.project.findMany({
                include: {
                    applies: true
                }
            });
            return allProjects;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException("Something bad happened", { cause: new Error(), description: err });
        }
    }
    async getProjectById(projectId) {
        const projectExists = await this.prisma.project.findUnique({
            where: {
                projectId,
            }
        });
        if (!projectExists) {
            throw new common_1.BadRequestException("Something bad happened", { cause: new Error(), description: "Project not found" });
        }
        try {
            const project = await this.prisma.project.findUnique({
                where: {
                    projectId,
                },
                include: {
                    applies: {
                        include: {
                            user: true
                        }
                    }
                }
            });
            return project;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException("Something bad happened", { cause: new Error(), description: err });
        }
    }
    async updateProject(projectId, data) {
        const projectExists = await this.prisma.project.findUnique({
            where: {
                projectId,
            }
        });
        if (!projectExists) {
            throw new Error('Project does not exist!');
        }
        data.updatedAt = new Date();
        let updateProject;
        try {
            updateProject = await this.prisma.project.update({
                where: {
                    projectId,
                },
                data: Object.assign({}, data)
            });
        }
        catch (err) {
            throw new common_1.InternalServerErrorException("Something bad happened", { cause: new Error(), description: err });
        }
        const person = await this.prisma.user.findUnique({
            where: {
                id: projectExists.ownerId,
            }
        });
        const managerId = person.managerId;
        const manager = await this.prisma.user.findUnique({
            where: {
                id: managerId,
            }
        });
        const email = manager.email;
        const name = manager.name;
        const token = jwt.sign({ sub: projectId }, process.env.JWT_APPROVE);
        try {
            const emailSent = await transporter.sendMail({
                from: '"NoReply DELLPROJECTS" <noreply@dellprojects.com>',
                to: email,
                subject: "Reset Password",
                html: (0, htmlSendApprove_1.htmlApprove)(name, token, projectId)
            });
            console.log("Message sent: ", emailSent.messageId);
        }
        catch (err) {
            throw new common_1.InternalServerErrorException("Something bad happened", { cause: new Error(), description: err });
        }
        return updateProject;
    }
    async deleteProject(projectId) {
        const projectExists = await this.prisma.project.findUnique({
            where: {
                projectId,
            }
        });
        if (!projectExists) {
            throw new Error('Project does not exist!');
        }
        try {
            const deleted = await this.prisma.project.delete({
                where: {
                    projectId,
                }
            });
            return deleted;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException("Something bad happened", { cause: new Error(), description: err });
        }
    }
    async filterProject(data) {
        try {
            const project = await this.prisma.project.findMany({
                where: data,
                include: {
                    applies: true
                }
            });
            return project;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException("Something bad happened", { cause: new Error(), description: err });
        }
    }
    async approveProject(token, status, feedback) {
        let projectId;
        try {
            const sub = jwt.verify(token, process.env.JWT_APPROVE);
            projectId = sub.sub;
        }
        catch (_a) {
            throw new common_1.UnauthorizedException("Something bad happened", { cause: new Error(), description: "Invalid token" });
        }
        if (!projectId) {
            throw new common_1.UnauthorizedException("Something bad happened", { cause: new Error(), description: "Invalid token" });
        }
        const project = await this.prisma.project.findUnique({
            where: {
                projectId: projectId,
            }
        });
        if (!project) {
            throw new Error('Project does not exist!');
        }
        if (project.status != "Pending") {
            throw new Error('Project already approved!');
        }
        let projectReturn;
        try {
            projectReturn = await this.prisma.project.update({
                where: {
                    projectId: projectId,
                },
                data: {
                    status: status,
                    feedback: feedback,
                }
            });
        }
        catch (err) {
            throw new common_1.InternalServerErrorException("Something bad happened", { cause: new Error(), description: err });
        }
        const owner = projectReturn.ownerId;
        const ownerPoints = await this.prisma.user.findUnique({
            where: {
                id: owner,
            }
        });
        try {
            await this.prisma.user.update({
                where: {
                    id: owner,
                },
                data: {
                    points: ownerPoints.points + 100,
                }
            });
        }
        catch (err) {
            throw new common_1.InternalServerErrorException("Something bad happened", { cause: new Error(), description: err });
        }
        return projectReturn;
    }
    async cancelProject(projectId, id) {
        const project = await this.prisma.project.findUnique({
            where: {
                projectId,
            }
        });
        if (!project) {
            throw new Error('Project does not exist!');
        }
        if (project.ownerId !== id) {
            throw new common_1.UnauthorizedException("Something bad happened", { cause: new Error(), description: "You can't cancel this project" });
        }
        try {
            const project = await this.prisma.project.update({
                where: {
                    projectId,
                },
                data: {
                    status: "Canceled",
                    blockedSubscription: true,
                }
            });
            return project;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException("Something bad happened", { cause: new Error(), description: err });
        }
    }
    async receivingSubscription(projectId, blocked) {
        const project = await this.prisma.project.findUnique({
            where: {
                projectId,
            }
        });
        if (!project) {
            throw new Error('Project does not exist!');
        }
        try {
            const project = await this.prisma.project.update({
                where: {
                    projectId,
                },
                data: {
                    blockedSubscription: blocked,
                }
            });
            return project;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException("Something bad happened", { cause: new Error(), description: err });
        }
    }
    async finalizeProject(projectId, id) {
        const project = await this.prisma.project.findUnique({
            where: {
                projectId,
            }
        });
        if (!project) {
            throw new Error('Project does not exist!');
        }
        if (project.ownerId !== id && project.coleaderId !== id) {
            throw new common_1.UnauthorizedException("Something bad happened", { cause: new Error(), description: "You can't finalize this project" });
        }
        let projectReturn;
        try {
            projectReturn = await this.prisma.project.update({
                where: {
                    projectId,
                },
                data: {
                    status: "Finished",
                    blockedSubscription: true,
                }
            });
        }
        catch (err) {
            throw new common_1.InternalServerErrorException("Something bad happened", { cause: new Error(), description: err });
        }
        try {
            const persons = await this.prisma.apply.findMany({
                where: {
                    projectId,
                }
            });
            for (let i = 0; i < persons.length; i++) {
                const person = await this.prisma.user.findUnique({
                    where: {
                        id: persons[i].userId,
                    }
                });
                await this.prisma.user.update({
                    where: {
                        id: persons[i].userId,
                    },
                    data: {
                        points: person.points + 50,
                    }
                });
            }
        }
        catch (err) {
            throw new common_1.InternalServerErrorException("Something bad happened", { cause: new Error(), description: err });
        }
    }
};
ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
exports.ProjectsService = ProjectsService;
//# sourceMappingURL=projects.service.js.map