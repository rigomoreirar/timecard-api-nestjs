import { Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { EntriesRepository } from './entries.repository';

@Injectable()
export class EntriesService {
    constructor(private readonly entriesRepository: EntriesRepository) {}

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

    delete(timecardId: number, entriesId: number) {
        return this.entriesRepository.delete(timecardId, entriesId);
    }
}
