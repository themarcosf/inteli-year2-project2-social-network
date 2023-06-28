import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { v4 as uuid } from 'uuid';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { BadRequestException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/Login.dto';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import * as nodemailer from 'nodemailer';
import { smtpConfig } from '../../Common/SMTP/SMTPconfig';
import { html } from 'src/Common/SMTP/HTML/htmlSendForgot';
import { ResetPasswordDTO } from './dto/resetPassword.dto';

dotenv.config();

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

function exclude(user, keys) {
    for (let key of keys) {
      delete user[key]
    }
    return user
}

@Injectable()
export class UsersService {

    constructor (private readonly prisma: PrismaService) {}

    async create(data: CreateUserDTO) {

        const id = uuid();

        //Check if user already exists
        const userExists = await this.prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (userExists) {
            //throw new Error('User already exists');
            throw new BadRequestException("Something bad happened", {cause: new Error(), description: "User already exists"})
        }

        //Hashin password
        const hashedPassWord = await bcrypt.hash(data.password, 8) 

        data.password = hashedPassWord


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
            }
        } catch {
            throw new InternalServerErrorException("Something bad happened", {cause: new Error(), description: "Problems on creation"})
        }
    }

    // async Login(data: LoginDTO) {
    //     //Check if user exists
    //     const user = await this.prisma.user.findUnique({
    //         where: {
    //             email: data.email
    //         }
    //     });

    //     if (!user) {
    //         throw new UnauthorizedException("Something bad happened", {cause: new Error(), description: "Email or Password doesn't match"})
    //     }

    //     //Check if password is correct
    //     const passwordMatch = await bcrypt.compare(data.password, user.password)

    //     if (!passwordMatch) {
    //         throw new UnauthorizedException("Something bad happened", {cause: new Error(), description: "Email or Password doesn't match"})
    //     }

    //     let token = jwt.sign({
    //         email: user.email
    //     }, process.env.USER_LOGIN_HASH, {
    //         subject: user.id,
    //         expiresIn: "30m"
    //     });
        
    //     return {
    //         token: token,
    //         user: {
    //             id: user.id,
    //             email: user.email,
    //             name: user.name,
    //         }
    //     }
    // }

    // async Auth(id: string) {
    //     console.log(id)
    //     let user = null;
    //     try {
    //         const user1 = this.prisma.user.findUnique({
    //             where: {
    //                 id: id
    //             },
    //         });

    //         user = exclude(user1, ['password']);
    //         console.log(user)
    //     } catch (err) {
    //         throw new InternalServerErrorException("Something bad happened", {cause: new Error(), description: err})
    //     }
        
    //     if (!user) {
    //         throw new BadRequestException("Something bad happened", {cause: new Error(), description: "User not found"})
    //     }

    //     return user
    // }

    async update(id: string, data: any) {
        //Verify if user already exists
        const userExists = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!userExists) {
            throw new BadRequestException("Something bad happened", {cause: new Error(), description: "User doesn't exists"})
        }

        //Verify if new email already exists
        if (data.email) {
            const emailExists = await this.prisma.user.findUnique({
                where: {
                    email: data.email
                }
            })

            if (emailExists) {
                throw new BadRequestException("Something bad happened", {cause: new Error(), description: "Email already exists"})
            }
        }
        
        //Verifying if password is being changed
        if (data.password || data.newPassword) {
            if (!data.newPassword) {
                throw new BadRequestException("Something bad happened", {cause: new Error(), description: "New password is required"})
            }

            //Verify if password is correct
            const passwordMatch = await bcrypt.compare(data.password, userExists.password)

            if (!passwordMatch) {
                throw new UnauthorizedException("Something bad happened", {cause: new Error(), description: "Password doesn't match"})
            }

            const hashedPassWord = await bcrypt.hash(data.newPassword, 8) 
            data.password = hashedPassWord
        }

        //Defining date of update
        data.updatedAt = new Date()

        //Deleting newPassword
        delete data.newPassword

        //Efetua a atualição
        try {
            await this.prisma.user.update({
                data,
                where: {
                    id: id
                }
            })
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", {cause: new Error(), description: err})
        }
        
        return {
            message: "Doing great",
            statusCode: 200,
            description: "Information updated successfully"
        }
    }

    async getOne(id: string) {
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
            throw new BadRequestException("Something bad happened", {cause: new Error(), description: "User not found"})
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
        }
    }

    async getUser(id: string) {
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
            throw new BadRequestException("Something bad happened", {cause: new Error(), description: "User not found"})
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
        }
    }

    async getOneByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email
            },
        });

        if (!user) {
            throw new BadRequestException("Something bad happened", {cause: new Error(), description: "User not found"})
        }

        return user
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

    async getUserByName(name: string) {
        return this.prisma.user.findMany({
            where: {
                name: name
            },
            select: {
                id: true,
                name: true,
                n_dell: true
            }
        })
    }

    async delete(id: string) {
        //Verify if user already exists
        const userExists = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!userExists) {
            throw new BadRequestException("Something bad happened", {cause: new Error(), description: "User doesn't exists"})
        }

        try {
            await this.prisma.user.delete({
                where: {
                    id: id
                }
            })
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", {cause: new Error(), description: err})
        }
        
        return {
            message: "Doing great",
            statusCode: 200,
            description: "User deleted with success"
        }
    }

    async sendForgotPasswordEmail(email: string) {
        //Verify if user already exists
        const userExists = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!userExists) {
            throw new BadRequestException("Something bad happened", {cause: new Error(), description: "The operation could not be completed"})
        }

        var resetCode = Math.floor(1000 + Math.random() * 9000);

        // Set resetCode on user
        try {
            await this.prisma.user.update({
                data: {
                    code: resetCode.toString()
                },
                where: {
                    email: email
                }
            })
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", {cause: new Error(), description: err})
        }

        // send mail with defined transport object
        try {
            await transporter.sendMail({
                from: '"NoReply DELLPROJECTS" <noreply@dellprojects.com>', 
                to: email, // list of receivers
                subject: "Reset Password", // Subject line
                html: html(resetCode) // html body
            });
        } catch (err) {
            console.log(err)
            throw new InternalServerErrorException("Something bad happened", {cause: new Error(), description: err})
        }

        return {
            message: "Doing great",
            statusCode: 200,
            description: "Email sent, please check your inbox"
        }
    }

    async resetPassword(data: ResetPasswordDTO) {
        //Verify token
        const email = data.email;
        const code = data.code;
        let password = data.newPassword;


        //Verify if user already exists
        const userExists = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!userExists) {
            throw new BadRequestException("Something bad happened", {cause: new Error(), description: "The operation could not be completed"})
        }

        //Verify if code is correct
        if (userExists.code != code) {
            throw new BadRequestException("Something bad happened", {cause: new Error(), description: "Unanuthorized, please try again"})
        }

        //Hashin password
        const hashedPassWord = await bcrypt.hash(password, 8) 

        password = hashedPassWord

        //Update password
        try {
            await this.prisma.user.update({
                data: {
                    password: password
                },
                where: {
                    email: email
                }
            })
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", {cause: new Error(), description: err})
        }

        return {
            message: "Doing great",
            statusCode: 200,
            description: "Password updated, please login again"
        }
    }

    async addHighligth(id: string, highligth: object) {
        //Verify if user already exists
        const userExists = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!userExists) {
            throw new BadRequestException("Something bad happened", {cause: new Error(), description: "User doesn't exists"})
        }

        console.log(userExists.highligths)
        console.log(highligth)

        let newHighlugth = JSON.parse(userExists.highligths)
        
        newHighlugth.push(highligth)

        newHighlugth = JSON.stringify(newHighlugth)

        try {
            await this.prisma.user.update({
                data: {
                    highligths: newHighlugth
                },
                where: {
                    id: id
                }
            })
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", {cause: new Error(), description: err})
        }

        return {
            message: "Doing great",
            statusCode: 200,
            description: "Habillity added with success"
        }
    }

    async getRanking(id) {
        const allUsers = await this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                points: true
            }
        })

        let sortedPeople = allUsers.sort(
            (p1, p2) => (p1.points < p2.points) ? 1 : (p1.points > p2.points) ? -1 : 0);

        

        const userPosition = sortedPeople.findIndex((user) => user.id == id)

        let displayUsers = sortedPeople.slice(0,10)

        return {
            ranking: displayUsers,
            position: userPosition + 1
        }

    }
}
