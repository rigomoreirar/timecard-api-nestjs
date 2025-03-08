import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTimecardDto } from './dto/create-timecard.dto';
import { UpdateTimecardDto } from './dto/update-timecard.dto';

@Injectable()
export class TimecardsRepository {
    constructor(private readonly databaseService: DatabaseService) {}

    save(createTimecardDto: CreateTimecardDto) {
        return this.databaseService.timecard.create({
            data: createTimecardDto,
        });
    }

    getAll() {
        return this.databaseService.timecard.findMany({
            where: { isDeleted: false },
        });
    }

    getAllUsers() {
        return this.databaseService.timecard.findMany({
            where: { isDeleted: false },
            distinct: ['userId'],
            select: { userId: true },
        });
    }

    getById(timecardId: number) {
        return this.databaseService.timecard.findFirst({
            where: { id: timecardId, isDeleted: false },
        });
    }

    getByUserId(userId: number) {
        return this.databaseService.timecard.findFirst({
            where: { userId: userId, isDeleted: false },
        });
    }

    update(timecardId: number, updateTimecardDto: UpdateTimecardDto) {
        return this.databaseService.timecard.update({
            where: { id: timecardId, isDeleted: false },
            data: updateTimecardDto,
        });
    }

    delete(timecardId: number) {
        return this.databaseService.timecard.update({
            where: { id: timecardId },
            data: { isDeleted: true },
        });
    }
}
