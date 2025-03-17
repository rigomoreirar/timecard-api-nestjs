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
            const traceId: string = this.logger.createTraceId();

            if (error instanceof Error) {
                this.logger.error({
                    traceId,
                    message: 'Database error when trying to save',
                    method: 'TimecardsRepository.save',
                    optionalParameter: `createTimecardDto: ${JSON.stringify(createTimecardDto)}`,
                    errorMessage: error.message,
                    stack: error.stack,
                });

                throw new InternalServerErrorException({
                    message: 'Failed to save timecard data',
                    traceId,
                });
            }
        }
    }

    getAll() {
        try {
            return this.databaseService.timecard.findMany({
                where: { isDeleted: false },
            });
        } catch (error) {
            const traceId: string = this.logger.createTraceId();

            if (error instanceof Error) {
                this.logger.error({
                    traceId,
                    message: 'Database error when trying to getAll',
                    method: 'TimecardsRepository.getAll',
                    errorMessage: error.message,
                    stack: error.stack,
                });

                throw new InternalServerErrorException({
                    message: 'Failed to retrieve all timecards data',
                    traceId,
                });
            }
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
            const traceId: string = this.logger.createTraceId();

            if (error instanceof Error) {
                this.logger.error({
                    traceId,
                    message: 'Database error when trying to getAllUsers',
                    method: 'TimecardsRepository.getAllUsers',
                    errorMessage: error.message,
                    stack: error.stack,
                });

                throw new InternalServerErrorException({
                    message: 'Failed to retrieve all users data',
                    traceId,
                });
            }
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
                    message: 'Database error when trying to getById',
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
        }
    }

    getByUserId(userId: number) {
        try {
            return this.databaseService.timecard.findMany({
                where: { userId: userId, isDeleted: false },
            });
        } catch (error) {
            const traceId: string = this.logger.createTraceId();

            if (error instanceof Error) {
                this.logger.error({
                    traceId,
                    message: 'Database error when trying to getByUserId',
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
        }
    }

    update(timecardId: number, updateTimecardDto: UpdateTimecardDto) {
        try {
            return this.databaseService.timecard.update({
                where: { id: timecardId, isDeleted: false },
                data: updateTimecardDto,
            });
        } catch (error) {
            const traceId: string = this.logger.createTraceId();

            if (error instanceof Error) {
                this.logger.error({
                    traceId,
                    message: 'Database error when trying to update',
                    method: 'TimecardsRepository.update',
                    optionalParameter: `timecardId: ${timecardId}, updateTimecardDto: ${JSON.stringify(updateTimecardDto)}`,
                    errorMessage: error.message,
                    stack: error.stack,
                });

                throw new InternalServerErrorException({
                    message: 'Failed to update timecard',
                    traceId,
                });
            }
        }
    }

    delete(timecardId: number) {
        try {
            return this.databaseService.timecard.update({
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
                    optionalParameter: `timecardId: ${timecardId}`,
                    errorMessage: error.message,
                    stack: error.stack,
                });

                throw new InternalServerErrorException({
                    message: 'Failed to delete timecard',
                    traceId,
                });
            }
        }
    }
}
