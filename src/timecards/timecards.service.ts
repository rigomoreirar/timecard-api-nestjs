import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTimecardDto } from './dto/create-timecard.dto';
import { UpdateTimecardDto } from './dto/update-timecard.dto';
import { TimecardsRepository } from './timecards.repository';
import { AppLogger } from 'src/logger/app.logger';

@Injectable()
export class TimecardsService {
    constructor(
        private readonly timecardsRepository: TimecardsRepository,
        private readonly logger: AppLogger,
    ) {}

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
            const traceId: string = this.logger.createTraceId();

            this.logger.warn({
                traceId,
                message:
                    'No timecards found, empty string returned from database',
                method: 'TimecardsService.getAll',
            });
            throw new NotFoundException({
                message: 'No timecards found',
                traceId,
            });
        } else {
            return allTimecards;
        }
    }

    async getAllUsers() {
        const allUsers = await this.timecardsRepository.getAllUsers();

        if (!allUsers || allUsers.length === 0) {
            const traceId: string = this.logger.createTraceId();

            this.logger.warn({
                traceId,
                message: 'No users found, empty string returned from database',
                method: 'TimecardsService.getAllUsers',
            });
            throw new NotFoundException({
                message: 'No users found',
                traceId,
            });
        } else {
            return allUsers;
        }
    }

    async getById(timecardId: number) {
        const timecard = await this.validateTimecardId(
            timecardId,
            'get',
            'TimecardsService.getById',
            'timecardId',
            timecardId.toString(),
        );

        return timecard;
    }

    async getByUserId(userId: number) {
        const userExists = await this.validateUserId(
            userId,
            'TimecardsService.getByUserId',
            'userId',
            userId.toString(),
        );

        if (userExists) {
            const timecards =
                await this.timecardsRepository.getByUserId(userId);

            return timecards;
        }
    }

    async update(timecardId: number, updateTimecardDto: UpdateTimecardDto) {
        const validateTimecardId = await this.validateTimecardId(
            timecardId,
            'update',
            'TimecardsService.update',
            'timecardId',
            timecardId.toString(),
        );

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
        const validateTimecardId = await this.validateTimecardId(
            timecardId,
            'delete',
            'TimecardsService.delete',
            'timecardId',
            timecardId.toString(),
        );

        if (validateTimecardId) {
            await this.timecardsRepository.delete(timecardId);

            return {
                message: 'Timecard deleted successfully',
                deletedTimecardId: timecardId,
            };
        }
    }

    async validateTimecardId(
        timecardId: number,
        action: string,
        validationMethod: string,
        optionalParameterName: string,
        optionalParameterValue: string,
    ) {
        const timecard = await this.timecardsRepository.getById(timecardId);

        let validationMessage: string;

        if (action === 'delete' || action === 'get') {
            validationMessage =
                'Timecard requested does not exist or is already deleted';
        } else if (action === 'update') {
            validationMessage =
                'Cannot update timecard data as it does not exist or is already deleted';
        } else {
            validationMessage = 'unvalid action';
        }

        if (!timecard) {
            const traceId: string = this.logger.createTraceId();

            this.logger.warn({
                traceId,
                message: validationMessage,
                method: validationMethod,
                optionalParameter: `${optionalParameterName}: ${optionalParameterValue}`,
            });
            throw new NotFoundException({
                message: 'Timecard does not exist',
                traceId,
            });
        } else {
            return timecard;
        }
    }

    async validateUserId(
        userId: number,
        validationMethod: string,
        optionalParameterName: string,
        optionalParameterValue: string,
    ) {
        const users = await this.timecardsRepository.getAllUsers();
        let userExists = false;

        if (users) {
            userExists = users.some((user) => user.userId === userId);
        }

        if (!userExists) {
            const traceId: string = this.logger.createTraceId();

            this.logger.warn({
                traceId,
                message: "User doesn't exist or has no timecards available",
                method: validationMethod,
                optionalParameter: `${optionalParameterName}: ${optionalParameterValue}`,
            });
            throw new NotFoundException({
                message: 'User has no timecards available',
                traceId,
            });
        } else {
            return true;
        }
    }
}
