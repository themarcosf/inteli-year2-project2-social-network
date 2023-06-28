/** nestjs */
import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";

/** controllers */
import { RecommendationController } from "./recommendation.controller";

/** providers */
import { RecommendationService } from "./recommendation.serivce";

////////////////////////////////////////////////////////////////////////////////

@Module({
  imports: [HttpModule],
  controllers: [RecommendationController],
  providers: [RecommendationService]
})
export class RecommendationModule {}
