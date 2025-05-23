import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { EntriesRepository } from '../repositories/entries.repository';
import { ValidationService } from 'src/validation/validation.service';
import { JwtResponse } from 'src/auth/auth.interface';

@Injectable()
export class EntriesService {
    constructor(
        private readonly entriesRepository: EntriesRepository,
        private readonly validationService: ValidationService,
    ) {}

    async save(
        createEntryDto: CreateEntryDto,
        timecardId: number,
        user: JwtResponse,
    ) {
        const validateTimecardId =
            await this.validationService.validateTimecardId(timecardId);

        if (validateTimecardId) {
            if (!this.validationService.validateUserIsAdmin(user)) {
                if (validateTimecardId.userId !== user.userId) {
                    throw new ForbiddenException({
                        message:
                            "Not authorized to access this user's timecard",
                    });
                }
            }

            const newEntry: Prisma.EntryCreateInput = {
                task: createEntryDto.task,
                optionalDetails: createEntryDto.optionalDetails,
                timecard: {
                    connect: { id: timecardId },
                },
            };
            const savedEntry = await this.entriesRepository.save(newEntry);

            return {
                message: 'Entry saved succesfully.',
                newEntry: savedEntry,
            };
        }
    }

    async getAll(timecardId: number, user: JwtResponse) {
        const validateTimecardId =
            await this.validationService.validateTimecardId(timecardId);

        if (validateTimecardId) {
            if (!this.validationService.validateUserIsAdmin(user)) {
                if (validateTimecardId.userId !== user.userId) {
                    throw new ForbiddenException({
                        message:
                            "Not authorized to access this user's timecard",
                    });
                }
            }
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

    async getById(timecardId: number, entryId: number, user: JwtResponse) {
        const validateTimecardId =
            await this.validationService.validateTimecardId(timecardId);

        if (validateTimecardId) {
            if (!this.validationService.validateUserIsAdmin(user)) {
                if (validateTimecardId.userId !== user.userId) {
                    throw new ForbiddenException({
                        message:
                            "Not authorized to access this user's timecard",
                    });
                }
            }

            const entry = await this.validationService.validateEntryId(
                entryId,
                timecardId,
            );

            return entry;
        }
    }

    async update(
        updateEntryDto: UpdateEntryDto,
        timecardId: number,
        entryId: number,
        user: JwtResponse,
    ) {
        const validateTimecardId =
            await this.validationService.validateTimecardId(timecardId);

        if (validateTimecardId) {
            const validateEntryId =
                await this.validationService.validateEntryId(
                    entryId,
                    timecardId,
                );

            if (validateEntryId) {
                if (!this.validationService.validateUserIsAdmin(user)) {
                    if (validateTimecardId.userId !== user.userId) {
                        throw new ForbiddenException({
                            message:
                                "Not authorized to access this user's timecard",
                        });
                    }
                }

                const newEntry: Prisma.EntryUpdateInput = {
                    task: updateEntryDto.task,
                    optionalDetails: updateEntryDto.optionalDetails,
                };

                const updatedEntry = await this.entriesRepository.update(
                    entryId,
                    newEntry,
                );

                return {
                    message: 'Entry updated succesfully.',
                    updatedEntry: updatedEntry,
                };
            }
        }
    }
    async delete(timecardId: number, entryId: number, user: JwtResponse) {
        const validateTimecardId =
            await this.validationService.validateTimecardId(timecardId);
        if (validateTimecardId) {
            const validateEntryId =
                await this.validationService.validateEntryId(
                    entryId,
                    timecardId,
                );

            if (validateEntryId) {
                if (!this.validationService.validateUserIsAdmin(user)) {
                    if (validateTimecardId.userId !== user.userId) {
                        throw new ForbiddenException({
                            message:
                                "Not authorized to access this user's timecard",
                        });
                    }
                }

                await this.entriesRepository.delete(entryId);

                return {
                    message: 'Entry deleted succesfully.',
                    deletedEntry: entryId,
                    parentTimecardId: timecardId,
                };
            }
        }
    }
}
