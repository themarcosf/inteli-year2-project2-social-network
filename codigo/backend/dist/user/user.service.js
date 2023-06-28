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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(httpService, repository) {
        this.httpService = httpService;
        this.repository = repository;
    }
    async login(loginDto) {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.post("http://127.0.0.1:3001/auth/login", loginDto));
        const userExists = await this.findOne(data.user.id);
        if (!userExists) {
            const user = this.repository.create({
                userIdLegacy: data.user.id,
                email: data.user.email,
                name: data.user.name,
            });
            await this.repository.save(user);
        }
        return { accessToken: data.token };
    }
    async findOne(userIdLegacy) {
        return await this.repository.findOne({ where: { userIdLegacy } });
    }
    async findByEmail(email) {
        return await this.repository.findOne({ where: { email } });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [axios_1.HttpService,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map