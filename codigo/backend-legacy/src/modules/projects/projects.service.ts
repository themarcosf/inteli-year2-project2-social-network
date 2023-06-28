//this file contains all the functions that are called in the routes in the projects.controller.ts file
//@ts-nocheck
/* eslint-disable prettier/prettier */
import { BadRequestException, InternalServerErrorException, UnauthorizedException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProjectDTO } from './dto/Project.dto';
import { v4 as uuid } from 'uuid';
import { Catch } from '@nestjs/common/decorators';
import * as nodemailer from 'nodemailer';
import { smtpConfig } from '../../Common/SMTP/SMTPconfig';
import { html } from 'src/Common/SMTP/HTML/htmlSendForgot';
import { htmlApprove } from 'src/Common/SMTP/HTML/htmlSendApprove';
import * as jwt from 'jsonwebtoken';


const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: false,
    auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass
    },
    tls: {
        rejectUnauthorized: false
    }
})

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) { }

    async createProject(ownerId: string, data: ProjectDTO) {

        let projectExists = await this.prisma.project.findMany({
            where: {
                name: data.name,
            }
        })

        if (projectExists.length > 0) {
            throw new BadRequestException("Something bad happened", { cause: new Error(), description: "Project already exists" })
        }

        let project: any;

        //Doing the creation
        try {
            if (data.coleaderId != null && data.coleaderId != undefined && data.coleaderId != "") {
                project = await this.prisma.project.create({
                    data: {
                        projectId: uuid(),
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
            } else {
                project = await this.prisma.project.create({
                    data: {
                        projectId: uuid(),
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
        } catch (err) {
            console.log(err)
            throw new InternalServerErrorException("Something bad happened", { cause: new Error(), description: err })
        }

        //Sending Email to Manager authorizing the project
        const person = await this.prisma.user.findUnique({
            where: {
                id: ownerId,
            }
        })

        const managerId = person.managerId;

        let email = "";
        let name = "";

        if (!managerId.includes("@")) {
            const manager = await this.prisma.user.findUnique({
                where: {
                    id: managerId,
                }
            })

            email = manager.email;
            name = manager.name;
        } else {
            email = managerId;
            name = "Manager";
        }

        const token = jwt.sign({ sub: project.projectId }, process.env.JWT_APPROVE);

        try {
            const emailSent = await transporter.sendMail({
                from: '"NoReply DELLPROJECTS" <noreply@dellprojects.com>',
                to: email, // list of receivers
                subject: "Reset Password", // Subject line
                html: htmlApprove(name, token, project.projectId) // html body
            });

            console.log("Message sent: ", emailSent.messageId);
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", { cause: new Error(), description: err })
        }

        return project;
    } //ok

    async getAllProjects() {
        try {
            const allProjects = await this.prisma.project.findMany({
                include: {
                    applies: true
                }
            });
            return allProjects;
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", { cause: new Error(), description: err })
        }

    } //ok

    async getProjectById(projectId: string) {
        //Verify if the project exists
        const projectExists = await this.prisma.project.findUnique({
            where: {
                projectId,
            }
        })

        if (!projectExists) {
            throw new BadRequestException("Something bad happened", { cause: new Error(), description: "Project not found" })
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
            })
            return project;
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", { cause: new Error(), description: err })
        }

    } //ok

    async updateProject(projectId: string, data: any) {
        //Verify if the project exists
        const projectExists = await this.prisma.project.findUnique({
            where: {
                projectId,
            }
        })

        if (!projectExists) {
            throw new Error('Project does not exist!')
        }

        data.updatedAt = new Date()

        let updateProject;

        //Doing the update
        try {
            updateProject = await this.prisma.project.update({
                where: {
                    projectId,
                },
                data: {
                    ...data,
                }
            })
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", { cause: new Error(), description: err })
        }

        //Get Manager Email and Name
        const person = await this.prisma.user.findUnique({
            where: {
                id: projectExists.ownerId,
            }
        })

        const managerId = person.managerId;

        const manager = await this.prisma.user.findUnique({
            where: {
                id: managerId,
            }
        })

        const email = manager.email;
        const name = manager.name;


        //Sending Email to Manager authorizing the project
        const token = jwt.sign({ sub: projectId }, process.env.JWT_APPROVE);

        try {
            const emailSent = await transporter.sendMail({
                from: '"NoReply DELLPROJECTS" <noreply@dellprojects.com>',
                to: email, // list of receivers
                subject: "Reset Password", // Subject line
                html: htmlApprove(name, token, projectId) // html body
            });

            console.log("Message sent: ", emailSent.messageId);
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", { cause: new Error(), description: err })
        }

        return updateProject;
    } //ok

    async deleteProject(projectId: string) {
        //Verify if the project exists
        const projectExists = await this.prisma.project.findUnique({
            where: {
                projectId,
            }
        })

        if (!projectExists) {
            throw new Error('Project does not exist!')
        }

        try {
            const deleted = await this.prisma.project.delete({
                where: {
                    projectId,
                }
            })

            return deleted;
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", { cause: new Error(), description: err })
        }
    } //ok

    async filterProject(data: any) {
        //Filtering the projects
        try {
            const project = await this.prisma.project.findMany({
                where: data,
                include: {
                    applies: true
                }
            })

            return project;
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", { cause: new Error(), description: err })
        }

    } //ok

    async approveProject(token: string, status: string, feedback: string) {
        //Verifying if the token is valid
        let projectId;

        try {
            const sub = jwt.verify(token, process.env.JWT_APPROVE);

            projectId = sub.sub;

        } catch {
            throw new UnauthorizedException("Something bad happened", { cause: new Error(), description: "Invalid token" });
        }

        if (!projectId) {
            throw new UnauthorizedException("Something bad happened", { cause: new Error(), description: "Invalid token" });
        }

        //Getting the project
        const project = await this.prisma.project.findUnique({
            where: {
                projectId: projectId,
            }
        })

        //Verifying if the project exists
        if (!project) {
            throw new Error('Project does not exist!')
        }

        //Verifying if the project is already approved
        if (project.status != "Pending") {
            throw new Error('Project already approved!')
        }

        let projectReturn: any;

        //Updating the project
        try {
            projectReturn = await this.prisma.project.update({
                where: {
                    projectId: projectId,
                },
                data: {
                    status: status,
                    feedback: feedback,
                }
            })
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", { cause: new Error(), description: err })
        }

        //Giving points to the owner

        //Getting the owner
        const owner = projectReturn.ownerId;

        //Getting the owner points
        const ownerPoints = await this.prisma.user.findUnique({
            where: {
                id: owner,
            }
        })

        //Updating the owner points
        try {
            await this.prisma.user.update({
                where: {
                    id: owner,
                },
                data: {
                    points: ownerPoints.points + 100,
                }
            })
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", { cause: new Error(), description: err })
        }

        return projectReturn;
    }

    async cancelProject(projectId: string, id: string) {
        //Getting the project
        const project = await this.prisma.project.findUnique({
            where: {
                projectId,
            }
        })

        //Verifying if the project exists
        if (!project) {
            throw new Error('Project does not exist!')
        }

        //Verifying if is the owner that is canceling the project
        if (project.ownerId !== id) {
            throw new UnauthorizedException("Something bad happened", { cause: new Error(), description: "You can't cancel this project" });
        }

        //Updating the project
        try {
            const project = await this.prisma.project.update({
                where: {
                    projectId,
                },
                data: {
                    status: "Canceled",
                    blockedSubscription: true,
                }
            })
            return project;
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", { cause: new Error(), description: err })
        }
    }

    async receivingSubscription(projectId: string, blocked: boolean) {
        //Getting the project
        const project = await this.prisma.project.findUnique({
            where: {
                projectId,
            }
        })

        //Verifying if the project exists
        if (!project) {
            throw new Error('Project does not exist!')
        }

        //Updating the project
        try {
            const project = await this.prisma.project.update({
                where: {
                    projectId,
                },
                data: {
                    blockedSubscription: blocked,
                }
            })
            return project;
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", { cause: new Error(), description: err })
        }
    }

    async finalizeProject(projectId: string, id: string) {
        //Getting the project
        const project = await this.prisma.project.findUnique({
            where: {
                projectId,
            }
        })

        //Verifying if the project exists
        if (!project) {
            throw new Error('Project does not exist!')
        }

        //Verifying if is the owner that is canceling the project
        if (project.ownerId !== id && project.coleaderId !== id) {
            throw new UnauthorizedException("Something bad happened", { cause: new Error(), description: "You can't finalize this project" });
        }

        let projectReturn: any;

        //Updating the project
        try {
            projectReturn = await this.prisma.project.update({
                where: {
                    projectId,
                },
                data: {
                    status: "Finished",
                    blockedSubscription: true,
                }
            })
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", { cause: new Error(), description: err })
        }

        //Giving point to everyone that subscribed
        try {
            const persons = await this.prisma.apply.findMany({
                where: {
                    projectId,
                }
            })

            for (let i = 0; i < persons.length; i++) {
                const person = await this.prisma.user.findUnique({
                    where: {
                        id: persons[i].userId,
                    }
                })

                await this.prisma.user.update({
                    where: {
                        id: persons[i].userId,
                    },
                    data: {
                        points: person.points + 50,
                    }
                })
            }
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", { cause: new Error(), description: err })
        }
    } //ok
}

