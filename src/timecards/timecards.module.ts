import { Module } from '@nestjs/common';
import { TimecardsService } from './timecards.service';
import { TimecardsController } from './timecards.controller';
import { DatabaseModule } from '../database/database.module';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { ValidationModule } from 'src/validation/validation.module';

@Module({
    imports: [DatabaseModule, RepositoriesModule, ValidationModule],
    controllers: [TimecardsController],
    providers: [TimecardsService],
    exports: [TimecardsService],
})
export class TimecardsModule {}
