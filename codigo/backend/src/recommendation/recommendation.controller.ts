import { Body, Controller, Post } from "@nestjs/common";
import { ContentDto } from "./dto/content.dto";
import { RecommendationService } from "./recommendation.serivce";

@Controller("recommendation")
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) { }

  // // @UseGuards(AuthGuard)
  @Post()
  async recommend(@Body() content: ContentDto) {
    return await this.recommendationService.recommend(content);
  }
}
