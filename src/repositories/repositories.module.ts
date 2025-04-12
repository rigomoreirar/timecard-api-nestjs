import { Module } from '@nestjs/common';
import { TimecardsRepository } from './timecards.repository';
import { EntriesRepository } from './entries.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [TimecardsRepository, EntriesRepository],
    exports: [TimecardsRepository, EntriesRepository],
})
export class RepositoriesModule {}
