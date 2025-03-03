import { Module } from '@nestjs/common';
import { TimecardsService } from './timecards.service';
import { TimecardsController } from './timecards.controller';

@Module({
  controllers: [TimecardsController],
  providers: [TimecardsService],
})
export class TimecardsModule {}
