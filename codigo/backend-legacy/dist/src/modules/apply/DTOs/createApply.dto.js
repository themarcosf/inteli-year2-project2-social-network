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
exports.createApplyDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class createApplyDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Project ID',
        example: 'id',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createApplyDTO.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Role ID',
        example: 'id',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createApplyDTO.prototype, "offerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Why',
        example: 'Why do you want this job?',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createApplyDTO.prototype, "why", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Habilities',
        example: 'What skills do you want to develop?',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createApplyDTO.prototype, "habilities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Experiences',
        example: 'name',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createApplyDTO.prototype, "userId", void 0);
exports.createApplyDTO = createApplyDTO;
//# sourceMappingURL=createApply.dto.js.map