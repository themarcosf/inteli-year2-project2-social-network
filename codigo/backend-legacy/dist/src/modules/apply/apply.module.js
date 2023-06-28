"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyModule = void 0;
const common_1 = require("@nestjs/common");
const apply_service_1 = require("./apply.service");
const apply_controller_1 = require("./apply.controller");
const prisma_service_1 = require("../../prisma.service");
let ApplyModule = class ApplyModule {
};
ApplyModule = __decorate([
    (0, common_1.Module)({
        controllers: [apply_controller_1.ApplyController],
        providers: [apply_service_1.ApplyService, prisma_service_1.PrismaService]
    })
], ApplyModule);
exports.ApplyModule = ApplyModule;
//# sourceMappingURL=apply.module.js.map