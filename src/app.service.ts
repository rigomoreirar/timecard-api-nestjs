import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getMicroserviceName(): string {
        return 'timecard-api-microservice 1.0v';
    }
}
