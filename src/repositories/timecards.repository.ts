import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TimecardsRepository {
    constructor(private readonly databaseService: DatabaseService) {}

    async save(timecardCreateInput: Prisma.TimecardCreateInput) {
        try {
            return await this.databaseService.timecard.create({
                data: timecardCreateInput,
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

    async getAllByUser(userId: number) {
        try {
            return await this.databaseService.timecard.findMany({
                where: { isDeleted: false, userId: userId },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerErrorException({
                    message: 'Failed to retrieve all timecards data by user ID',
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

    async update(
        timecardId: number,
        timecardUpdateInput: Prisma.TimecardUpdateInput,
    ) {
        try {
            return await this.databaseService.timecard.update({
                where: { id: timecardId, isDeleted: false },
                data: timecardUpdateInput,
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
