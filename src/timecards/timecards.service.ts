import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Prisma, Timecard } from '@prisma/client';
import { JwtResponse } from 'src/auth/auth.interface';
import { CreateTimecardDto } from './dto/create-timecard.dto';
import { UpdateTimecardDto } from './dto/update-timecard.dto';
import { TimecardsRepository } from '../repositories/timecards.repository';
import { ValidationService } from 'src/validation/validation.service';

@Injectable()
export class TimecardsService {
    constructor(
        private readonly timecardsRepository: TimecardsRepository,
        private readonly validationService: ValidationService,
    ) {}

    async save(createTimecardDto: CreateTimecardDto, user: JwtResponse) {
        let newTimecard: Prisma.TimecardCreateInput;

        if (this.validationService.validateUserIsAdmin(user)) {
            if (!createTimecardDto.userId) {
                throw new NotFoundException({
                    message: 'User ID is required for admin role',
                });
            } else {
                newTimecard = {
                    ...createTimecardDto,
                    userId: createTimecardDto.userId,
                };
            }
        } else {
            newTimecard = {
                ...createTimecardDto,
                userId: user.userId,
            };
        }

        const savedTimecard = await this.timecardsRepository.save(newTimecard);

        return {
            message: 'Timecard saved succesfully.',
            newTimecard: savedTimecard,
        };
    }

    async getAll(user: JwtResponse) {
        let allTimecards: Timecard[];

        if (this.validationService.validateUserIsAdmin(user)) {
            allTimecards = await this.timecardsRepository.getAll();
        } else {
            allTimecards = await this.timecardsRepository.getAllByUser(
                user.userId,
            );
        }

        if (!allTimecards || allTimecards.length === 0) {
            throw new NotFoundException({
                message: 'No timecards found',
            });
        }

        return allTimecards;
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

    async getByUserId(userId: number, user: JwtResponse) {
        if (this.validationService.validateUserIsAdmin(user)) {
            const userExists =
                await this.validationService.validateUserId(userId);

            if (userExists) {
                const timecards =
                    await this.timecardsRepository.getByUserId(userId);

                return timecards;
            }
        } else {
            if (user.userId !== userId) {
                throw new ForbiddenException({
                    message: "Not authorized to access this user's timecards",
                });
            } else {
                const timecards = await this.timecardsRepository.getByUserId(
                    user.userId,
                );

                return timecards;
            }
        }
    }

    async getById(timecardId: number, user: JwtResponse) {
        const timecard =
            await this.validationService.validateTimecardId(timecardId);

        if (this.validationService.validateUserIsAdmin(user)) {
            return timecard;
        } else {
            if (timecard.userId !== user.userId) {
                throw new ForbiddenException({
                    message: "Not authorized to access this user's timecard",
                });
            } else {
                return timecard;
            }
        }
    }

    async update(
        timecardId: number,
        updateTimecardDto: UpdateTimecardDto,
        user: JwtResponse,
    ) {
        const validateTimecardId =
            await this.validationService.validateTimecardId(timecardId);

        if (validateTimecardId) {
            if (this.validationService.validateUserIsAdmin(user)) {
                if (!updateTimecardDto.userId) {
                    throw new NotFoundException({
                        message: 'User ID is required for admin role',
                    });
                }
            } else {
                if (validateTimecardId.userId !== user.userId) {
                    throw new ForbiddenException({
                        message:
                            "Not authorized to access this user's timecard",
                    });
                }
            }

            const newTimecard: Prisma.TimecardUpdateInput = {
                ...updateTimecardDto,
            };

            const updatedTimecard = await this.timecardsRepository.update(
                timecardId,
                newTimecard,
            );

            return {
                message: 'Timecard updated succesfully.',
                updatedTimecard: updatedTimecard,
            };
        }
    }

    async delete(timecardId: number, user: JwtResponse) {
        const validateTimecardId =
            await this.validationService.validateTimecardId(timecardId);

        if (validateTimecardId) {
            if (this.validationService.validateUserIsAdmin(user)) {
                await this.timecardsRepository.delete(timecardId);

                return {
                    message: 'Timecard deleted successfully',
                    deletedTimecardId: timecardId,
                };
            } else {
                if (validateTimecardId.userId !== user.userId) {
                    throw new ForbiddenException({
                        message:
                            "Not authorized to access this user's timecard",
                    });
                } else {
                    await this.timecardsRepository.delete(timecardId);

                    return {
                        message: 'Timecard deleted successfully',
                        deletedTimecardId: timecardId,
                    };
                }
            }
        }
    }
}
