import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
   @Get()
   index(): string {
      return "Pong";
   }
}

