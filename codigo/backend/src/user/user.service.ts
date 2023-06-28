/** nestjs */
import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

/** dependencies */
import { firstValueFrom, catchError, of } from "rxjs";

import { LoginDto } from "./dto/login.dto";
import { LoginResponse } from "./user.controller";
import { InjectRepository } from "@nestjs/typeorm";

import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(User) private repository: Repository<User>
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const response$ = this.httpService.post(
      "http://127.0.0.1:3001/auth/login",
      loginDto
    );

    const { data } = await firstValueFrom(response$).catch((error) => {
      throw new Error("Response is not an Observable");
    });

    // check if user exists and create it if not
    const userExists = await this.findOne(data.user.id);
    if (!userExists) {
      const user = this.repository.create({
        userIdLegacy: data.user.id,
        email: data.user.email,
        name: data.user.name
      });

      await this.repository.save(user);
    }

    console.log(data.userId)
    return { accessToken: data.token, userId: data.user.id };
  }

  async findOne(userIdLegacy: string): Promise<User> {
    return await this.repository.findOne({ where: { userIdLegacy } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ where: { email } });
  }
}
