import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { EntriesRepository } from './entries.repository';
import { AppLogger } from 'src/logger/app.logger';
import { TimecardsService } from 'src/timecards/timecards.service';

@Injectable()
export class EntriesService {
    constructor(
        private readonly entriesRepository: EntriesRepository,
        private readonly logger: AppLogger,
        private readonly timecardsService: TimecardsService,
    ) {}

    async save(createEntryDto: CreateEntryDto, timecardId: number) {
        const newEntry: CreateEntryDto = {
            ...createEntryDto,
            timecardId: timecardId,
        };

        const validateTimecardId =
            await this.timecardsService.validateTimecardId(
                timecardId,
                'save',
                'EntriesService.save',
                'timecardId',
                timecardId.toString(),
            );

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
            await this.timecardsService.validateTimecardId(
                timecardId,
                'get',
                'EntriesService.getAll',
                'timecardId',
                timecardId.toString(),
            );

        if (validateTimecardId) {
            const allEntries = await this.entriesRepository.getAll(timecardId);

            return allEntries;
        }
    }

    async getById(timecardId: number, entryId: number) {
        const validateTimecardId =
            await this.timecardsService.validateTimecardId(
                timecardId,
                'get',
                'EntriesService.getById',
                'entryId, timecardId',
                `${entryId}, ${timecardId}`,
            );

        if (validateTimecardId) {
            const entry = await this.validateEntryId(
                entryId,
                timecardId,
                'get',
                'EntriesService.getById',
                'entryId, timecardId',
                `${entryId}, ${timecardId}`,
            );

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
            await this.timecardsService.validateTimecardId(
                timecardId,
                'update',
                'EntriesService.update',
                'entryId, timecardId',
                `${entryId}, ${timecardId}`,
            );

        if (validateTimecardId) {
            const validateEntryId = await this.validateEntryId(
                entryId,
                timecardId,
                'update',
                'EntriesService.update',
                'entriesId, timecardId',
                `${entryId}, ${timecardId}`,
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
            await this.timecardsService.validateTimecardId(
                timecardId,
                'delete',
                'EntriesService.delete',
                'entriesId, timecardId',
                `${entryId}, ${timecardId}`,
            );
        if (validateTimecardId) {
            const validateEntryId = await this.validateEntryId(
                entryId,
                timecardId,
                'delete',
                'EntriesService.delete',
                'entriesId, timecardId',
                `${entryId}, ${timecardId}`,
            );

            if (validateEntryId) {
                await this.entriesRepository.delete(timecardId, entryId);

                return {
                    message: 'Entry deleted succesfully.',
                    deletedEntry: entryId,
                    parentTimecardId: timecardId,
                };
            }
        }
    }

    async validateEntryId(
        entryId: number,
        timecardId: number,
        action: string,
        validationMethod: string,
        optionalParameterName: string,
        optionalParameterValue: string,
    ) {
        const entry = await this.entriesRepository.getById(timecardId, entryId);

        let validationMessage: string;

        if (action === 'delete' || action === 'get') {
            validationMessage =
                'Entry requested does not exist or is already deleted';
        } else if (action === 'update') {
            validationMessage =
                'Cannot update entry data as it does not exist or is already deleted';
        } else {
            validationMessage = 'unvalid action';
        }

        if (!entry) {
            const traceId: string = this.logger.createTraceId();

            this.logger.warn({
                traceId,
                message: validationMessage,
                method: validationMethod,
                optionalParameter: `${optionalParameterName}: ${optionalParameterValue}`,
            });

            throw new BadRequestException({
                message: 'Entry does not exist',
                traceId,
            });
        } else {
            return entry;
        }
    }
}
