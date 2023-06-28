/** nestjs */
import { Module } from "@nestjs/common";

/** controllers */
import { ApplyController } from "./apply.controller";
import { HttpModule } from "@nestjs/axios";
import { ApplyService } from "./apply.service";
////////////////////////////////////////////////////////////////////////////////

@Module({
  imports: [HttpModule],
  controllers: [ApplyController],
  providers: [ApplyService]
})
export class ApplyModule {}
