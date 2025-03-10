import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTimecardDto } from './dto/create-timecard.dto';
import { UpdateTimecardDto } from './dto/update-timecard.dto';

@Injectable()
export class TimecardsRepository {
    constructor(private readonly databaseService: DatabaseService) {}

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
            if (error instanceof Error) {
                throw new Error(`Failed to get timecard: ${error.message}`);
            }

            throw new Error('Failed to get timecard: Unknown error');
        }
    }

    getByUserId(userId: number) {
        try {
            return this.databaseService.timecard.findFirst({
                where: { userId: userId, isDeleted: false },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to get timecard: ${error.message}`);
            }

            throw new Error('Failed to get timecard: Unknown error');
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
                throw new Error(`Failed to update timecard: ${error.message}`);
            }

            throw new Error('Failed to update timecard: Unknown error');
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
