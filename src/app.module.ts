import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TimecardsModule } from './timecards/timecards.module';
import { DatabaseModule } from './database/database.module';
import { EntriesModule } from './entries/entries.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TimecardsModule,
        DatabaseModule,
        EntriesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
