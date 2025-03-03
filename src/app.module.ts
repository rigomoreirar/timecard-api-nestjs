import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TimecardsModule } from './timecards/timecards.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TimecardsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
