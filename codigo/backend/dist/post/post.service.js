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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_entity_1 = require("./entities/post.entity");
const typeorm_2 = require("typeorm");
const query_runner_factory_1 = require("../commom/queryRunner/query-runner.factory");
const user_service_1 = require("../user/user.service");
let PostService = class PostService {
    constructor(repository, queryRunner, userService) {
        this.repository = repository;
        this.queryRunner = queryRunner;
        this.userService = userService;
    }
    async create(createPostDto, userId) {
        const foundUser = await this.userService.findOne(userId);
        await this.queryRunner.connect();
        await this.queryRunner.startTransaction();
        const post = this.repository.create(createPostDto);
        try {
            post.user = Promise.resolve(foundUser);
            await this.queryRunner.commitTransaction(post);
            return post;
        }
        catch (err) {
            await this.queryRunner.rollbackTransaction();
            throw new Error("An error ocurred while creating the post.");
        }
        finally {
            await this.queryRunner.release();
        }
    }
    async findAll() {
        const queryBuilder = this.repository
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.user", "user");
        return await queryBuilder.getMany();
    }
    async findOne(id) {
        const queryBuilder = this.repository
            .createQueryBuilder("post")
            .where("post.id = :id", { id })
            .leftJoinAndSelect("post.user", "user");
        let user = (await queryBuilder.getOne()).user;
        console.log(user);
        return queryBuilder.getOne();
    }
    update(id, updatePostDto) {
        return "// TODO: implement update method";
    }
    remove(id) {
        return "// TODO: implement remove method";
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        query_runner_factory_1.QueryRunnerFactory,
        user_service_1.UserService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map