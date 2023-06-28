/** nestjs */
import { Module } from "@nestjs/common";

/** controllers */
import { ProjectController } from "./project.controller";
import { HttpModule } from "@nestjs/axios";
import { ProjectService } from "./project.service";
////////////////////////////////////////////////////////////////////////////////

@Module({
  imports: [HttpModule],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule { }
