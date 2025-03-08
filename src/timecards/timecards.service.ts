import { Injectable } from '@nestjs/common';
import { CreateTimecardDto } from './dto/create-timecard.dto';
import { UpdateTimecardDto } from './dto/update-timecard.dto';
import { TimecardsRepository } from './timecards.repository';

@Injectable()
export class TimecardsService {
    constructor(private readonly timecardsRepository: TimecardsRepository) {}

    save(createTimecardDto: CreateTimecardDto) {
        return this.timecardsRepository.save(createTimecardDto);
    }

    getAll() {
        return this.timecardsRepository.getAll();
    }

    getAllUsers() {
        return this.timecardsRepository.getAllUsers();
    }

    getById(timecardId: number) {
        return this.timecardsRepository.getById(timecardId);
    }

    getByUserId(userId: number) {
        return this.timecardsRepository.getByUserId(userId);
    }

    update(timecardId: number, updateTimecardDto: UpdateTimecardDto) {
        return this.timecardsRepository.update(timecardId, updateTimecardDto);
    }

    delete(timecardId: number) {
        return this.timecardsRepository.delete(timecardId);
    }
}
