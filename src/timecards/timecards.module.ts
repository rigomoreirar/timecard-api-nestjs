import { Module } from '@nestjs/common';
import { TimecardsService } from './timecards.service';
import { TimecardsController } from './timecards.controller';
import { DatabaseModule } from '../database/database.module';
import { TimecardsRepository } from './timecards.repository';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
    imports: [DatabaseModule, LoggerModule],
    controllers: [TimecardsController],
    providers: [TimecardsService, TimecardsRepository],
    exports: [TimecardsService],
})
export class TimecardsModule {}
