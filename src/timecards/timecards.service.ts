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
        const savedTimecard =
            await this.timecardsRepository.save(createTimecardDto);

        return savedTimecard;
    }

    async getAll() {
        const allTimecards = await this.timecardsRepository.getAll();

        return allTimecards;
    }

    async getAllUsers() {
        const allUsers = await this.timecardsRepository.getAllUsers();

        return allUsers;
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
        const timecards = await this.validateUserId(
            userId,
            'get',
            'TimecardsService.getByUserId',
            'userId',
            userId.toString(),
        );

        return timecards;
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

            if (updatedTimecard === null) {
                const traceId: string = this.logger.createTraceId();

                this.logger.warn({
                    traceId,
                    message: 'Failed to update timecard data',
                    method: 'TimecardsService.update',
                    optionalParameter: `timecardId: ${timecardId}, updateTimecardDto: ${JSON.stringify(updateTimecardDto)}`,
                });
                throw new NotFoundException({
                    message: 'Failed to update timecard data',
                    traceId,
                });
            } else {
                return updatedTimecard;
            }
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
            const deletedTimecard =
                await this.timecardsRepository.delete(timecardId);

            if (deletedTimecard === null) {
                const traceId: string = this.logger.createTraceId();

                this.logger.warn({
                    traceId,
                    message: 'Failed to delete timecard data',
                    method: 'TimecardsService.delete',
                    optionalParameter: `timecardId: ${timecardId}`,
                });
                throw new NotFoundException({
                    message: 'Failed to delete timecard data',
                    traceId,
                });
            } else {
                return {
                    id: timecardId,
                    message: 'Timecard deleted successfully',
                };
            }
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
        action: string,
        validationMethod: string,
        optionalParameterName: string,
        optionalParameterValue: string,
    ) {
        const timecard = await this.timecardsRepository.getByUserId(userId);

        const users = await this.timecardsRepository.getAllUsers();
        let userExists = false;

        if (users) {
            userExists = users.some((user) => user.userId === userId);
        }

        let validationMessage: string;

        if (action === 'get') {
            validationMessage =
                'User has no timecards or timecards are already deleted';
        } else {
            validationMessage = 'unvalid action';
        }

        if (!userExists) {
            const traceId: string = this.logger.createTraceId();

            this.logger.warn({
                traceId,
                message: validationMessage,
                method: validationMethod,
                optionalParameter: `${optionalParameterName}: ${optionalParameterValue}`,
            });
            throw new NotFoundException({
                message: 'User has no timecards available',
                traceId,
            });
        } else if (timecard?.length === 0) {
            const traceId: string = this.logger.createTraceId();

            this.logger.warn({
                traceId,
                message: validationMessage,
                method: validationMethod,
                optionalParameter: `${optionalParameterName}: ${optionalParameterValue}`,
            });
            throw new NotFoundException({
                message: 'User has no timecards available',
                traceId,
            });
        } else {
            return timecard;
        }
    }
}
