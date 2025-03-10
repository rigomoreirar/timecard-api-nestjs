import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';

@Injectable()
export class EntriesRepository {
    constructor(private readonly databaseService: DatabaseService) {}

    save(createEntryDto: CreateEntryDto) {
        try {
            return this.databaseService.entry.create({
                data: createEntryDto,
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to save entry: ${error.message}`);
            }

            throw new Error('Failed to save entry: Unknown error');
        }
    }

    getAll(timecardId: number) {
        try {
            return this.databaseService.entry.findMany({
                where: { timecardId: timecardId },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to get all entries: ${error.message}`);
            }

            throw new Error('Failed to get all entries: Unknown error');
        }
    }

    getById(timecardId: number, entryId: number) {
        try {
            return this.databaseService.entry.findFirst({
                where: { id: entryId, timecardId: timecardId },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to get entry: ${error.message}`);
            }

            throw new Error('Failed to get entry: Unknown error');
        }
    }

    update(updateEntryDto: UpdateEntryDto, entryId: number) {
        try {
            return this.databaseService.entry.update({
                where: { id: entryId },
                data: updateEntryDto,
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to update entry: ${error.message}`);
            }

            throw new Error('Failed to update entry: Unknown error');
        }
    }

    async delete(timecardId: number, entryId: number) {
        if (!timecardId) {
            throw new Error('Timecard ID is required');
        }

        try {
            const entryBelongsToTimecard =
                await this.databaseService.entry.findFirst({
                    where: { id: entryId, timecardId },
                });

            if (!entryBelongsToTimecard) {
                throw new Error('Entry does not belong to timecard');
            }

            return await this.databaseService.entry.delete({
                where: { id: entryId, timecardId },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to delete entry: ${error.message}`);
            }

            throw new Error('Failed to delete entry: Unknown error');
        }
    }
}
