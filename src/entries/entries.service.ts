import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { EntriesRepository } from './entries.repository';
import { TimecardsService } from 'src/timecards/timecards.service';

@Injectable()
export class EntriesService {
    constructor(
        private readonly entriesRepository: EntriesRepository,
        private readonly timecardsService: TimecardsService,
    ) {}

    async save(createEntryDto: CreateEntryDto, timecardId: number) {
        const newEntry: CreateEntryDto = {
            ...createEntryDto,
            timecardId: timecardId,
        };

        const validateTimecardId =
            await this.timecardsService.validateTimecardId(timecardId);

        if (validateTimecardId) {
            const saveEntry = await this.entriesRepository.save(newEntry);

            return {
                message: 'Entry saved succesfully.',
                newEntry: saveEntry,
            };
        }
    }

    async getAll(timecardId: number) {
        const validateTimecardId =
            await this.timecardsService.validateTimecardId(timecardId);

        if (validateTimecardId) {
            const allEntries = await this.entriesRepository.getAll(timecardId);

            if (!allEntries || allEntries.length === 0) {
                throw new NotFoundException({
                    message: 'No entries found',
                });
            } else {
                return allEntries;
            }
        }
    }

    async getById(timecardId: number, entryId: number) {
        const validateTimecardId =
            await this.timecardsService.validateTimecardId(timecardId);

        if (validateTimecardId) {
            const entry = await this.validateEntryId(entryId, timecardId);

            return entry;
        }
    }

    async update(
        updateEntryDto: UpdateEntryDto,
        timecardId: number,
        entryId: number,
    ) {
        const updateEntry: UpdateEntryDto = {
            ...updateEntryDto,
            timecardId: timecardId,
        };

        const validateTimecardId =
            await this.timecardsService.validateTimecardId(timecardId);

        if (validateTimecardId) {
            const validateEntryId = await this.validateEntryId(
                entryId,
                timecardId,
            );

            if (validateEntryId) {
                const updatedEntry = await this.entriesRepository.update(
                    updateEntry,
                    entryId,
                );

                return {
                    message: 'Entry updated succesfully.',
                    updatedEntry: updatedEntry,
                };
            }
        }
    }
    async delete(timecardId: number, entryId: number) {
        const validateTimecardId =
            await this.timecardsService.validateTimecardId(timecardId);
        if (validateTimecardId) {
            const validateEntryId = await this.validateEntryId(
                entryId,
                timecardId,
            );

            if (validateEntryId) {
                await this.entriesRepository.delete(entryId);

                return {
                    message: 'Entry deleted succesfully.',
                    deletedEntry: entryId,
                    parentTimecardId: timecardId,
                };
            }
        }
    }

    async validateEntryId(entryId: number, timecardId: number) {
        const entry = await this.entriesRepository.getById(timecardId, entryId);

        if (!entry) {
            throw new BadRequestException({
                message: 'Entry does not exist',
            });
        } else {
            return entry;
        }
    }
}
