import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { DatabaseModule } from '../database/database.module';
import { EntriesRepository } from './entries.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [EntriesController],
    providers: [EntriesService, EntriesRepository],
})
export class EntriesModule {}
