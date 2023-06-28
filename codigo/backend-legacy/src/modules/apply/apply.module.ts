import { Module } from '@nestjs/common';
import { ApplyService } from './apply.service';
import { ApplyController } from './apply.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ApplyController],
  providers: [ApplyService, PrismaService]
})
export class ApplyModule {}
