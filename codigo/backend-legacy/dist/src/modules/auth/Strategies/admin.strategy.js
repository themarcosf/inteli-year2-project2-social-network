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
exports.AdminStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth.service");
const dotenv = require("dotenv");
dotenv.config();
let AdminStrategy = class AdminStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(authService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.USER_LOGIN_HASH,
        });
        this.authService = authService;
    }
    async validate(payload) {
        console.log("JWT Admin Strategy Loaded");
        const user = await this.authService.validateAdminUser(payload.sub);
        if (!user) {
            throw new common_1.UnauthorizedException("Unaunthorized", { cause: new Error(), description: "You doesn't have permission to access this resource" });
        }
        return user;
    }
};
AdminStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AdminStrategy);
exports.AdminStrategy = AdminStrategy;
//# sourceMappingURL=admin.strategy.js.map