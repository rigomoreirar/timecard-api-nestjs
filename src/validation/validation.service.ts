import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { JwtResponse } from 'src/auth/auth.interface';
import { TimecardsRepository } from 'src/repositories/timecards.repository';
import { EntriesRepository } from 'src/repositories/entries.repository';

@Injectable()
export class ValidationService {
    constructor(
        private readonly timecardsRepository: TimecardsRepository,
        private readonly entriesRepository: EntriesRepository,
    ) {}
    async validateTimecardId(timecardId: number) {
        const timecard = await this.timecardsRepository.getById(timecardId);

        if (!timecard) {
            throw new NotFoundException({
                message: 'Timecard does not exist',
            });
        } else {
            return timecard;
        }
    }

    async validateUserId(userId: number) {
        const users = await this.timecardsRepository.getAllUsers();
        let userExists = false;

        if (users) {
            userExists = users.some((user) => user.userId === userId);
        }

        if (!userExists) {
            throw new NotFoundException({
                message: 'User has no timecards available',
            });
        } else {
            return true;
        }
    }

    validateUserIsAdmin(user: JwtResponse) {
        if (user.role !== 'admin') {
            return false;
        } else {
            return true;
        }
    }

    async validateEntryId(entryId: number, timecardId: number) {
        const entry = await this.entriesRepository.getById(timecardId, entryId);

        if (!entry) {
            throw new BadRequestException({
                message: 'Entry does not exist',
            });
        } else {
            return entry;
        }
    }
}
