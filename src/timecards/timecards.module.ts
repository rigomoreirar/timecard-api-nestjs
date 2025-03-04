import { Module } from '@nestjs/common';
import { TimecardsService } from './timecards.service';
import { TimecardsController } from './timecards.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
    controllers: [TimecardsController],
    providers: [TimecardsService],
    imports: [DatabaseModule],
})
export class TimecardsModule {}
