/** nestjs */
import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";

/** controllers */
import { UserController } from "./user.controller";

/** providers */
import { UserService } from "./user.service";

/** dependencies */
import { User } from "./entities/user.entity";
import { AuthGuard } from "./guards/auth.guard";
import { JwtModule } from "@nestjs/jwt";
////////////////////////////////////////////////////////////////////////////////

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: "f7e86dbef8b2d9c4697077596f1acb16",
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService],
})
export class UserModule {}
