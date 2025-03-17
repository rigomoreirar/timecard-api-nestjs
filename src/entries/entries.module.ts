import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { DatabaseModule } from '../database/database.module';
import { EntriesRepository } from './entries.repository';
import { LoggerModule } from 'src/logger/logger.module';
import { TimecardsModule } from 'src/timecards/timecards.module';

@Module({
    imports: [DatabaseModule, LoggerModule, TimecardsModule],
    controllers: [EntriesController],
    providers: [EntriesService, EntriesRepository],
})
export class EntriesModule {}
