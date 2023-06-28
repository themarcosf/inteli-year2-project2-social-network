/** nestjs */
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

/** modules */
import { UserModule } from "./user/user.module";
import { PostModule } from "./post/post.module";
import { ProjectModule } from "./project/project.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerMiddleware } from "./logger.middleware";
import { ApplyModule } from "./applies/apply.module";
// import { RecommendationModule } from "./recommendation/recommendation.module";
import { IndexController } from './index/index.controller';

@Module({
  imports: [
    ApplyModule,
    UserModule,
    PostModule,
    ProjectModule,
    // RecommendationModule,
    /** runtime environment variables (e.g. OS shell exports) take precedence */
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === "prod" ? true : false,
    }),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "database.sqlite",
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [IndexController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
