import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTimecardDto } from './dto/create-timecard.dto';
import { UpdateTimecardDto } from './dto/update-timecard.dto';
import { AppLogger } from 'src/logger/app.logger';

@Injectable()
export class TimecardsRepository {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly logger: AppLogger,
    ) {}

    save(createTimecardDto: CreateTimecardDto) {
        try {
            return this.databaseService.timecard.create({
                data: createTimecardDto,
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to save timecard: ${error.message}`);
            }

            throw new Error('Failed to save timecard: Unknown error');
        }
    }

    getAll() {
        try {
            return this.databaseService.timecard.findMany({
                where: { isDeleted: false },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(
                    `Failed to get all timecards: ${error.message}`,
                );
            }

            throw new Error('Failed to get all timecards: Unknown error');
        }
    }

    getAllUsers() {
        try {
            return this.databaseService.timecard.findMany({
                where: { isDeleted: false },
                distinct: ['userId'],
                select: { userId: true },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to get all users: ${error.message}`);
            }

            throw new Error('Failed to get all users: Unknown error');
        }
    }

    getById(timecardId: number) {
        try {
            return this.databaseService.timecard.findFirst({
                where: { id: timecardId, isDeleted: false },
            });
        } catch (error) {
            const traceId: string = this.logger.createTraceId();

            if (error instanceof Error) {
                this.logger.error({
                    traceId,
                    message: 'Database error in getById',
                    method: 'TimecardsRepository.getById',
                    optionalParameter: `timecardId: ${timecardId}`,
                    errorMessage: error.message,
                    stack: error.stack,
                });

                throw new InternalServerErrorException({
                    message: 'Failed to retrieve timecard data',
                    traceId,
                });
            }

            this.logger.error({
                traceId,
                message: 'Database error in getById - unknown error object',
                method: 'TimecardsRepository.getById',
                optionalParameter: `timecardId: ${timecardId}`,
            });

            throw new InternalServerErrorException({
                message: 'Failed to retrieve timecard data: Unknown error',
                traceId,
            });
        }
    }

    getByUserId(userId: number) {
        try {
            return this.databaseService.timecard.findFirst({
                where: { userId: userId, isDeleted: false },
            });
        } catch (error) {
            const traceId: string = this.logger.createTraceId();

            if (error instanceof Error) {
                this.logger.error({
                    traceId,
                    message: 'Database error in getByUserId',
                    method: 'TimecardsRepository.getByUserId',
                    optionalParameter: `userId: ${userId}`,
                    errorMessage: error.message,
                    stack: error.stack,
                });

                throw new InternalServerErrorException({
                    message: 'Failed to retrieve timecard data by user ID',
                    traceId,
                });
            }

            this.logger.error({
                traceId,
                message: 'Database error in getByUserId - unknown error object',
                method: 'TimecardsRepository.getByUserId',
                optionalParameter: `userId: ${userId}`,
            });

            throw new InternalServerErrorException({
                message:
                    'Failed to retrieve timecard data by user ID: Unknown error',
                traceId,
            });
        }
    }

    update(timecardId: number, updateTimecardDto: UpdateTimecardDto) {
        try {
            return this.databaseService.timecard.update({
                where: { id: timecardId, isDeleted: false },
                data: updateTimecardDto,
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to delete timecard: ${error.message}`);
            }

            throw new Error('Failed to delete timecard: Unknown error');
        }
    }

    delete(timecardId: number) {
        try {
            return this.databaseService.timecard.update({
                where: { id: timecardId },
                data: { isDeleted: true },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to delete timecard: ${error.message}`);
            }

            throw new Error('Failed to delete timecard: Unknown error');
        }
    }
}
