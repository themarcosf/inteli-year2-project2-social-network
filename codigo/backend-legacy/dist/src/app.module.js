"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const projects_module_1 = require("./modules/projects/projects.module");
const users_module_1 = require("./modules/users/users.module");
const unsureAdmin_middleware_1 = require("./Common/middleware/unsureAdmin.middleware");
const apply_module_1 = require("./modules/apply/apply.module");
const health_controller_1 = require("./modules/health/health.controller");
const auth_module_1 = require("./modules/auth/auth.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(unsureAdmin_middleware_1.UnsureAdmin)
            .forRoutes({ path: 'User/delete/:id', method: common_1.RequestMethod.DELETE });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [projects_module_1.ProjectsModule, users_module_1.UsersModule, apply_module_1.ApplyModule, auth_module_1.AuthModule],
        controllers: [health_controller_1.HealthController],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map