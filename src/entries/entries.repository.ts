import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';

@Injectable()
export class EntriesRepository {
    constructor(private readonly databaseService: DatabaseService) {}

    async save(createEntryDto: CreateEntryDto) {
        try {
            return this.databaseService.entry.create({
                data: createEntryDto,
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

    async update(updateEntryDto: UpdateEntryDto, entryId: number) {
        try {
            return this.databaseService.entry.update({
                where: { id: entryId },
                data: updateEntryDto,
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
