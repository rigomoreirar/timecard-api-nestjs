import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { DatabaseModule } from '../database/database.module';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { ValidationModule } from 'src/validation/validation.module';

@Module({
    imports: [DatabaseModule, RepositoriesModule, ValidationModule],
    controllers: [EntriesController],
    providers: [EntriesService],
})
export class EntriesModule {}
