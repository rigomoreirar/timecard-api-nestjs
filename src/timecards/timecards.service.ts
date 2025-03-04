import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTimecardDto } from './dto/create-timecard.dto';
import { UpdateTimecardDto } from './dto/update-timecard.dto';

@Injectable()
export class TimecardsService {
    constructor(private readonly databaseService: DatabaseService) {}

    create(createTimecardDto: CreateTimecardDto) {
        return this.databaseService.timecard.create({
            data: createTimecardDto,
        });
    }

    findAll() {
        return this.databaseService.timecard.findMany({
            where: { isDeleted: false },
        });
    }

    findOne(id: number) {
        // why not findunique?
        return this.databaseService.timecard.findFirst({
            where: { id, isDeleted: false },
        });
    }

    update(id: number, updateTimecardDto: UpdateTimecardDto) {
        return this.databaseService.timecard.update({
            where: { id, isDeleted: false },
            data: updateTimecardDto,
        });
    }

    remove(id: number) {
        return this.databaseService.timecard.update({
            where: { id },
            data: { isDeleted: true },
        });
    }
}
