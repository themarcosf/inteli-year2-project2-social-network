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
exports.ProjectDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ProjectDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Project name',
        example: 'Desenvolvimento de aplicação',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProjectDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Project description',
        example: 'o projeto e sobre desenvolvimento de uma aplicação',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProjectDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Project tags',
        example: 'tags',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProjectDTO.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Project roles',
        example: 'roles',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProjectDTO.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Project start date',
        example: '10/10/2023',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Date)
], ProjectDTO.prototype, "start", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Project end date',
        example: '10/10/2023',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Date)
], ProjectDTO.prototype, "end", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'End subscription date',
        example: '10/10/2023',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Date)
], ProjectDTO.prototype, "endSubscription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Badge NFT',
        example: 'badge',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProjectDTO.prototype, "badge", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Project coleader ID',
        example: '56',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProjectDTO.prototype, "coleaderId", void 0);
exports.ProjectDTO = ProjectDTO;
//# sourceMappingURL=Project.dto.js.map