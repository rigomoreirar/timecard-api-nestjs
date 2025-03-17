import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { EntriesRepository } from './entries.repository';
import { AppLogger } from 'src/logger/app.logger';

@Injectable()
export class EntriesService {
    constructor(
        private readonly entriesRepository: EntriesRepository,
        private readonly logger: AppLogger,
    ) {}

    save(createEntryDto: CreateEntryDto, timecardId: number) {
        const newEntry: CreateEntryDto = {
            ...createEntryDto,
            timecardId: timecardId,
        };

        return this.entriesRepository.save(newEntry);
    }

    getAll(timecardId: number) {
        return this.entriesRepository.getAll(timecardId);
    }

    getById(timecardId: number, entriesId: number) {
        return this.entriesRepository.getById(timecardId, entriesId);
    }

    update(
        updateEntryDto: UpdateEntryDto,
        timecardId: number,
        entriesId: number,
    ) {
        const updatedEntry: UpdateEntryDto = {
            ...updateEntryDto,
            timecardId: timecardId,
        };

        return this.entriesRepository.update(updatedEntry, entriesId);
    }

    delete(timecardId: number, entryId: number) {
        const traceId: string = this.logger.createTraceId();
        if (!timecardId) {
            this.logger.error({
                traceId,
                message:
                    'Database error when trying to delete, timecard ID is required',
                method: 'EntriesRepository.delete',
                optionalParameter: `timecardId: ${timecardId}, entryId: ${entryId}`,
            });

            throw new BadRequestException({
                message: 'Timecard ID is required',
                traceId,
            });
            // return this.entriesRepository.delete(timecardId, entriesId);
        }
    }
}
