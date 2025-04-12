import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EntriesRepository {
    constructor(private readonly databaseService: DatabaseService) {}

    async save(entryCreateInput: Prisma.EntryCreateInput) {
        try {
            return this.databaseService.entry.create({
                data: entryCreateInput,
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerErrorException({
                    message: 'Failed to save entry data',
                });
            }

            throw error;
        }
    }

    async getAll(timecardId: number) {
        try {
            return this.databaseService.entry.findMany({
                where: { timecardId: timecardId },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerErrorException({
                    message: 'Failed to retrieve all entries data',
                });
            }

            throw error;
        }
    }

    async getById(timecardId: number, entryId: number) {
        try {
            return this.databaseService.entry.findFirst({
                where: { id: entryId, timecardId: timecardId },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerErrorException({
                    message: 'Failed to retrieve entry data',
                });
            }

            throw error;
        }
    }

    async update(entryId: number, entryUpdateInput: Prisma.EntryUpdateInput) {
        try {
            return this.databaseService.entry.update({
                where: { id: entryId },
                data: entryUpdateInput,
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerErrorException({
                    message: 'Failed to update entry',
                });
            }

            throw error;
        }
    }

    async delete(entryId: number) {
        try {
            return this.databaseService.entry.update({
                where: { id: entryId },
                data: { isDeleted: true },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerErrorException({
                    message: 'Failed to delete entry',
                });
            }

            throw error;
        }
    }
}
