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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const uuid_1 = require("uuid");
const exceptions_1 = require("@nestjs/common/exceptions");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const SMTPconfig_1 = require("../../Common/SMTP/SMTPconfig");
const htmlSendForgot_1 = require("../../Common/SMTP/HTML/htmlSendForgot");
dotenv.config();
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
function exclude(user, keys) {
    for (let key of keys) {
        delete user[key];
    }
    return user;
}
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const id = (0, uuid_1.v4)();
        const userExists = await this.prisma.user.findUnique({
            where: {
                email: data.email
            }
        });
        if (userExists) {
            throw new exceptions_1.BadRequestException("Something bad happened", { cause: new Error(), description: "User already exists" });
        }
        const hashedPassWord = await bcrypt.hash(data.password, 8);
        data.password = hashedPassWord;
        try {
            const user = await this.prisma.user.create({
                data: {
                    id: id,
                    email: data.email,
                    password: data.password,
                    name: data.name,
                    bornDate: new Date(),
                    gender: data.gender,
                    n_dell: data.n_dell,
                    managerId: data.managerId,
                    habilities: data.habilities,
                    photoURL: data.photoURL,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });
            return {
                id: user.id,
                email: user.email,
                name: user.name,
            };
        }
        catch (_a) {
            throw new exceptions_1.InternalServerErrorException("Something bad happened", { cause: new Error(), description: "Problems on creation" });
        }
    }
    async update(id, data) {
        const userExists = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        });
        if (!userExists) {
            throw new exceptions_1.BadRequestException("Something bad happened", { cause: new Error(), description: "User doesn't exists" });
        }
        if (data.email) {
            const emailExists = await this.prisma.user.findUnique({
                where: {
                    email: data.email
                }
            });
            if (emailExists) {
                throw new exceptions_1.BadRequestException("Something bad happened", { cause: new Error(), description: "Email already exists" });
            }
        }
        if (data.password || data.newPassword) {
            if (!data.newPassword) {
                throw new exceptions_1.BadRequestException("Something bad happened", { cause: new Error(), description: "New password is required" });
            }
            const passwordMatch = await bcrypt.compare(data.password, userExists.password);
            if (!passwordMatch) {
                throw new exceptions_1.UnauthorizedException("Something bad happened", { cause: new Error(), description: "Password doesn't match" });
            }
            const hashedPassWord = await bcrypt.hash(data.newPassword, 8);
            data.password = hashedPassWord;
        }
        data.updatedAt = new Date();
        delete data.newPassword;
        try {
            await this.prisma.user.update({
                data,
                where: {
                    id: id
                }
            });
        }
        catch (err) {
            throw new exceptions_1.InternalServerErrorException("Something bad happened", { cause: new Error(), description: err });
        }
        return {
            message: "Doing great",
            statusCode: 200,
            description: "Information updated successfully"
        };
    }
    async getOne(id) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id
            },
            include: {
                projects: true,
                projectsColeader: true,
                applies: true
            }
        });
        if (!user) {
            throw new exceptions_1.BadRequestException("Something bad happened", { cause: new Error(), description: "User not found" });
        }
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            bornDate: user.bornDate,
            gender: user.gender,
            n_dell: user.n_dell,
            managerId: user.managerId,
            habilities: user.habilities,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            isAdmin: user.isAdmin,
            projects: user.projects,
            projectsColeader: user.projectsColeader,
            photoURL: user.photoURL,
            area: user.area,
            linkedin: user.linkedin,
            highlights: user.highligths,
        };
    }
    async getUser(id) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id
            },
            include: {
                projects: true,
                projectsColeader: true,
                applies: {
                    include: {
                        user: true
                    }
                }
            }
        });
        if (!user) {
            throw new exceptions_1.BadRequestException("Something bad happened", { cause: new Error(), description: "User not found" });
        }
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            bornDate: user.bornDate,
            gender: user.gender,
            n_dell: user.n_dell,
            managerId: user.managerId,
            habilities: user.habilities,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            isAdmin: user.isAdmin,
            projects: user.projects,
            projectsColeader: user.projectsColeader,
            photoURL: user.photoURL,
            area: user.area,
            linkedin: user.linkedin,
            highlights: user.highligths,
        };
    }
    async getOneByEmail(email) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email
            },
        });
        if (!user) {
            throw new exceptions_1.BadRequestException("Something bad happened", { cause: new Error(), description: "User not found" });
        }
        return user;
    }
    async getAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                bornDate: true,
                n_dell: true,
                gender: true,
                habilities: true,
                managerId: true,
                updatedAt: true,
                createdAt: true,
            }
        });
    }
    async getUserByName(name) {
        return this.prisma.user.findMany({
            where: {
                name: name
            },
            select: {
                id: true,
                name: true,
                n_dell: true
            }
        });
    }
    async delete(id) {
        const userExists = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        });
        if (!userExists) {
            throw new exceptions_1.BadRequestException("Something bad happened", { cause: new Error(), description: "User doesn't exists" });
        }
        try {
            await this.prisma.user.delete({
                where: {
                    id: id
                }
            });
        }
        catch (err) {
            throw new exceptions_1.InternalServerErrorException("Something bad happened", { cause: new Error(), description: err });
        }
        return {
            message: "Doing great",
            statusCode: 200,
            description: "User deleted with success"
        };
    }
    async sendForgotPasswordEmail(email) {
        const userExists = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!userExists) {
            throw new exceptions_1.BadRequestException("Something bad happened", { cause: new Error(), description: "The operation could not be completed" });
        }
        var resetCode = Math.floor(1000 + Math.random() * 9000);
        try {
            await this.prisma.user.update({
                data: {
                    code: resetCode.toString()
                },
                where: {
                    email: email
                }
            });
        }
        catch (err) {
            throw new exceptions_1.InternalServerErrorException("Something bad happened", { cause: new Error(), description: err });
        }
        try {
            await transporter.sendMail({
                from: '"NoReply DELLPROJECTS" <noreply@dellprojects.com>',
                to: email,
                subject: "Reset Password",
                html: (0, htmlSendForgot_1.html)(resetCode)
            });
        }
        catch (err) {
            console.log(err);
            throw new exceptions_1.InternalServerErrorException("Something bad happened", { cause: new Error(), description: err });
        }
        return {
            message: "Doing great",
            statusCode: 200,
            description: "Email sent, please check your inbox"
        };
    }
    async resetPassword(data) {
        const email = data.email;
        const code = data.code;
        let password = data.newPassword;
        const userExists = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!userExists) {
            throw new exceptions_1.BadRequestException("Something bad happened", { cause: new Error(), description: "The operation could not be completed" });
        }
        if (userExists.code != code) {
            throw new exceptions_1.BadRequestException("Something bad happened", { cause: new Error(), description: "Unanuthorized, please try again" });
        }
        const hashedPassWord = await bcrypt.hash(password, 8);
        password = hashedPassWord;
        try {
            await this.prisma.user.update({
                data: {
                    password: password
                },
                where: {
                    email: email
                }
            });
        }
        catch (err) {
            throw new exceptions_1.InternalServerErrorException("Something bad happened", { cause: new Error(), description: err });
        }
        return {
            message: "Doing great",
            statusCode: 200,
            description: "Password updated, please login again"
        };
    }
    async addHighligth(id, highligth) {
        const userExists = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        });
        if (!userExists) {
            throw new exceptions_1.BadRequestException("Something bad happened", { cause: new Error(), description: "User doesn't exists" });
        }
        console.log(userExists.highligths);
        console.log(highligth);
        let newHighlugth = JSON.parse(userExists.highligths);
        newHighlugth.push(highligth);
        newHighlugth = JSON.stringify(newHighlugth);
        try {
            await this.prisma.user.update({
                data: {
                    highligths: newHighlugth
                },
                where: {
                    id: id
                }
            });
        }
        catch (err) {
            throw new exceptions_1.InternalServerErrorException("Something bad happened", { cause: new Error(), description: err });
        }
        return {
            message: "Doing great",
            statusCode: 200,
            description: "Habillity added with success"
        };
    }
    async getRanking(id) {
        const allUsers = await this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                points: true
            }
        });
        let sortedPeople = allUsers.sort((p1, p2) => (p1.points < p2.points) ? 1 : (p1.points > p2.points) ? -1 : 0);
        const userPosition = sortedPeople.findIndex((user) => user.id == id);
        let displayUsers = sortedPeople.slice(0, 10);
        return {
            ranking: displayUsers,
            position: userPosition + 1
        };
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map