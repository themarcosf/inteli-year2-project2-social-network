import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma.service';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class UnsureAdmin implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    //Recebe o token inserido pela aplicação
    const authToken = req.headers.authorization;

    //Valida se o token está preenchido
    if (!authToken) {
        res.status(401).json({
            statusCode: 401,
            message: "Something bad happened",
            error: "Unauthorized"
        })
        return
    }

    let token = ""

    //Desestrutura o header "Bearer 'token'"
    token = authToken.split(" ")[1]

    //Valida se o token é válido
    try {
        //Verifica o Token
        const { sub } = jwt.verify(token, process.env.USER_LOGIN_HASH)

        //Recupera infos do usuário
        req.id = sub as string

        const prisma = new PrismaService()

        const user = await prisma.user.findUnique({
            where: {
                id: req.id
            }
        })

        if (!user.isAdmin) {
            // res.status(401).json({
            //     statusCode: 401,
            //     message: "Something bad happened",
            //     error: "Unauthorized"
            // })
            throw new Error()
        }

        return next();
    } catch(err) {
        //Retorna o erro caso o token não seja válido
        res.status(401).json({
            statusCode: 401,
            message: "Something bad happened",
            error: "Unauthorized"
        })
        return
    }
  }
}
