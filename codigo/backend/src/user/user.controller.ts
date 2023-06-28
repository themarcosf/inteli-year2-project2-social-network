/** nestjs */
import {
  Post,
  Get,
  Req,
  Body,
  HttpCode,
  UseGuards,
  Controller,
} from "@nestjs/common";

/** providers */
import { UserService } from "./user.service";

/** dependencies */
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "./guards/auth.guard";
import { User } from "./entities/user.entity";
////////////////////////////////////////////////////////////////////////////////

export interface PassportRequest extends Request {
  user?: User;
}

export interface LoginResponse {
  accessToken: string;
  userId: string;
}

@Controller("user")

export class UserController {
  constructor(private readonly userService: UserService) { }

  @HttpCode(200)
  @Post("login")
  login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.userService.login(loginDto);
  }

  // @UseGuards(AuthGuard)
  @Get("test")
  testJwt(@Req() req: PassportRequest) {
    return req["user"];
  }
}
