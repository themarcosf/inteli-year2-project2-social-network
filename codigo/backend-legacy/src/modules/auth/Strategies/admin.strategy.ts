import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.USER_LOGIN_HASH,
    });
  }

  async validate(payload: any) {
    console.log("JWT Admin Strategy Loaded");
    const user = await this.authService.validateAdminUser(payload.sub);
    if (!user) {
        throw new UnauthorizedException("Unaunthorized", {cause: new Error(), description: "You doesn't have permission to access this resource"});
    }
    return user;
  }
}