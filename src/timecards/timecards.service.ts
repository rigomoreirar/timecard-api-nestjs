import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTimecardDto } from './dto/create-timecard.dto';
import { UpdateTimecardDto } from './dto/update-timecard.dto';
import { TimecardsRepository } from './timecards.repository';
import { AppLogger } from 'src/logger/app.logger';

@Injectable()
export class TimecardsService {
    constructor(
        private readonly timecardsRepository: TimecardsRepository,
        private readonly logger: AppLogger,
    ) {}

    save(createTimecardDto: CreateTimecardDto) {
        return this.timecardsRepository.save(createTimecardDto);
    }

    getAll() {
        return this.timecardsRepository.getAll();
    }

    getAllUsers() {
        return this.timecardsRepository.getAllUsers();
    }

    async getById(timecardId: number) {
        const res = await this.timecardsRepository.getById(timecardId);

        if (res === null) {
            const traceId: string = this.logger.createTraceId();

            this.logger.warn({
                traceId,
                message: 'Timecard does not exist',
                method: 'TimecardsService.getById',
                optionalParameter: `timecardId: ${timecardId}`,
            });
            throw new NotFoundException({
                message: 'Timecard does not exist',
                traceId,
            });
        } else {
            return res;
        }
    }

    getByUserId(userId: number) {
        return this.timecardsRepository.getByUserId(userId);
    }

    update(timecardId: number, updateTimecardDto: UpdateTimecardDto) {
        return this.timecardsRepository.update(timecardId, updateTimecardDto);
    }

    delete(timecardId: number) {
        return this.timecardsRepository.delete(timecardId);
    }
}
