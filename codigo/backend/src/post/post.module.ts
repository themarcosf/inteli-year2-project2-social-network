/** nestjs */
import { Module, Query } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

/** controller */
import { PostController } from "./post.controller";

/** service */
import { PostService } from "./post.service";

/** dependencies */
import { Post } from "./entities/post.entity";
import { UserModule } from "../user/user.module";
import { QueryRunnerFactory } from "../commom/queryRunner/query-runner.factory";
////////////////////////////////////////////////////////////////////////////////

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService, QueryRunnerFactory],
})
export class PostModule {}
