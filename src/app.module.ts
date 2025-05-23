import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TimecardsModule } from './timecards/timecards.module';
import { DatabaseModule } from './database/database.module';
import { EntriesModule } from './entries/entries.module';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';
import { ValidationModule } from './validation/validation.module';
import { RepositoriesModule } from './repositories/repositories.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        LoggerModule,
        TimecardsModule,
        DatabaseModule,
        EntriesModule,
        AuthModule,
        ValidationModule,
        RepositoriesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
