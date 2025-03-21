import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { AppLogger } from 'src/logger/app.logger';

@Injectable()
export class EntriesRepository {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly logger: AppLogger,
    ) {}

    save(createEntryDto: CreateEntryDto) {
        try {
            return this.databaseService.entry.create({
                data: createEntryDto,
            });
        } catch (error) {
            const traceId: string = this.logger.createTraceId();

            if (error instanceof Error) {
                this.logger.error({
                    traceId,
                    message: 'Database error when trying to save',
                    method: 'EntriesRepository.save',
                    optionalParameter: `createEntryDto: ${JSON.stringify(createEntryDto)}`,
                    errorMessage: error.message,
                    stack: error.stack,
                });

                throw new InternalServerErrorException({
                    message: 'Failed to save entry data',
                    traceId,
                });
            }
        }
    }

    getAll(timecardId: number) {
        try {
            return this.databaseService.entry.findMany({
                where: { timecardId: timecardId },
            });
        } catch (error) {
            const traceId: string = this.logger.createTraceId();

            if (error instanceof Error) {
                this.logger.error({
                    traceId,
                    message: 'Database error when trying to getAll',
                    method: 'EntriesRepository.getAll',
                    optionalParameter: `timecardId: ${timecardId}`,
                    errorMessage: error.message,
                    stack: error.stack,
                });

                throw new InternalServerErrorException({
                    message: 'Failed to retrieve all entries data',
                    traceId,
                });
            }
        }
    }

    getById(timecardId: number, entryId: number) {
        try {
            return this.databaseService.entry.findFirst({
                where: { id: entryId, timecardId: timecardId },
            });
        } catch (error) {
            const traceId: string = this.logger.createTraceId();

            if (error instanceof Error) {
                this.logger.error({
                    traceId,
                    message: 'Database error when trying to getById',
                    method: 'EntriesRepository.getById',
                    optionalParameter: `timecardId: ${timecardId}, entryId: ${entryId}`,
                    errorMessage: error.message,
                    stack: error.stack,
                });

                throw new InternalServerErrorException({
                    message: 'Failed to retrieve entry data',
                    traceId,
                });
            }
        }
    }

    update(updateEntryDto: UpdateEntryDto, entryId: number) {
        try {
            return this.databaseService.entry.update({
                where: { id: entryId },
                data: updateEntryDto,
            });
        } catch (error) {
            const traceId: string = this.logger.createTraceId();

            if (error instanceof Error) {
                this.logger.error({
                    traceId,
                    message: 'Database error when trying to update',
                    method: 'EntriesRepository.update',
                    optionalParameter: `entryId: ${entryId}, updateEntryDto: ${JSON.stringify(updateEntryDto)}`,
                    errorMessage: error.message,
                    stack: error.stack,
                });

                throw new InternalServerErrorException({
                    message: 'Failed to update entry',
                    traceId,
                });
            }
        }
    }

    async delete(timecardId: number, entryId: number) {
        try {
            return this.databaseService.entry.update({
                where: { id: timecardId },
                data: { isDeleted: true },
            });
        } catch (error) {
            const traceId: string = this.logger.createTraceId();

            if (error instanceof Error) {
                this.logger.error({
                    traceId,
                    message: 'Database error when trying to delete',
                    method: 'TimecardsRepository.delete',
                    optionalParameter: `timecardId: ${timecardId}, entryId: ${entryId}`,
                    errorMessage: error.message,
                    stack: error.stack,
                });

                throw new InternalServerErrorException({
                    message: 'Failed to delete entry',
                    traceId,
                });
            }
        }
    }
}
