import { Module } from '@nestjs/common';
import { TimecardsService } from './timecards.service';
import { TimecardsController } from './timecards.controller';
import { DatabaseModule } from '../database/database.module';
import { TimecardsRepository } from './timecards.repository';
import { AppLogger } from 'src/logger/app.logger';

@Module({
    imports: [DatabaseModule],
    controllers: [TimecardsController],
    providers: [TimecardsService, TimecardsRepository, AppLogger],
})
export class TimecardsModule {}
