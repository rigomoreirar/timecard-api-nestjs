import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTimecardDto } from './dto/create-timecard.dto';
import { UpdateTimecardDto } from './dto/update-timecard.dto';
import { TimecardsRepository } from './timecards.repository';

@Injectable()
export class TimecardsService {
    constructor(private readonly timecardsRepository: TimecardsRepository) {}

    async save(createTimecardDto: CreateTimecardDto) {
        const saveTimecard =
            await this.timecardsRepository.save(createTimecardDto);

        return {
            message: 'Timecard saved succesfully.',
            newTimecard: saveTimecard,
        };
    }

    async getAll() {
        const allTimecards = await this.timecardsRepository.getAll();

        if (!allTimecards || allTimecards.length === 0) {
            throw new NotFoundException({
                message: 'No timecards found',
            });
        } else {
            return allTimecards;
        }
    }

    async getAllUsers() {
        const allUsers = await this.timecardsRepository.getAllUsers();

        if (!allUsers || allUsers.length === 0) {
            throw new NotFoundException({
                message: 'No users found',
            });
        } else {
            return allUsers;
        }
    }

    async getById(timecardId: number) {
        const timecard = await this.validateTimecardId(timecardId);

        return timecard;
    }

    async getByUserId(userId: number) {
        const userExists = await this.validateUserId(userId);

        if (userExists) {
            const timecards =
                await this.timecardsRepository.getByUserId(userId);

            return timecards;
        }
    }

    async update(timecardId: number, updateTimecardDto: UpdateTimecardDto) {
        const validateTimecardId = await this.validateTimecardId(timecardId);

        if (validateTimecardId) {
            const updatedTimecard = await this.timecardsRepository.update(
                timecardId,
                updateTimecardDto,
            );

            return {
                message: 'Timecard updated succesfully.',
                updatedTimecard: updatedTimecard,
            };
        }
    }

    async delete(timecardId: number) {
        const validateTimecardId = await this.validateTimecardId(timecardId);

        if (validateTimecardId) {
            await this.timecardsRepository.delete(timecardId);

            return {
                message: 'Timecard deleted successfully',
                deletedTimecardId: timecardId,
            };
        }
    }

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
}
