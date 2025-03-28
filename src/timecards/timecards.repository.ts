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

    async save(createTimecardDto: CreateTimecardDto) {
        try {
            return await this.databaseService.timecard.create({
                data: createTimecardDto,
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerErrorException({
                    message: 'Failed to save timecard data',
                });
            }

            throw error;
        }
    }

    async getAll() {
        try {
            return await this.databaseService.timecard.findMany({
                where: { isDeleted: false },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerErrorException({
                    message: 'Failed to retrieve all timecards data',
                });
            }
            throw error;
        }
    }

    async getAllUsers() {
        try {
            return await this.databaseService.timecard.findMany({
                where: { isDeleted: false },
                distinct: ['userId'],
                select: { userId: true },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerErrorException({
                    message: 'Failed to retrieve all users data',
                });
            }

            throw error;
        }
    }

    async getById(timecardId: number) {
        try {
            return await this.databaseService.timecard.findFirst({
                where: { id: timecardId, isDeleted: false },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerErrorException({
                    message: 'Failed to retrieve timecard data',
                });
            }

            throw error;
        }
    }

    async getByUserId(userId: number) {
        try {
            return await this.databaseService.timecard.findMany({
                where: { userId: userId, isDeleted: false },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerErrorException({
                    message: 'Failed to retrieve timecard data by user ID',
                });
            }

            throw error;
        }
    }

    async update(timecardId: number, updateTimecardDto: UpdateTimecardDto) {
        try {
            return await this.databaseService.timecard.update({
                where: { id: timecardId, isDeleted: false },
                data: updateTimecardDto,
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerErrorException({
                    message: 'Failed to update timecard',
                });
            }

            throw error;
        }
    }

    async delete(timecardId: number) {
        try {
            return await this.databaseService.timecard.update({
                where: { id: timecardId },
                data: { isDeleted: true },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerErrorException({
                    message: 'Failed to delete timecard',
                });
            }

            throw error;
        }
    }
}
