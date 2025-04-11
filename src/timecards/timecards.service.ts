import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateTimecardDto } from './dto/create-timecard.dto';
import { UpdateTimecardDto } from './dto/update-timecard.dto';
import { Prisma } from '@prisma/client';
import { TimecardsRepository } from './timecards.repository';
import { JwtResponse } from 'src/auth/auth.interface';

@Injectable()
export class TimecardsService {
    constructor(private readonly timecardsRepository: TimecardsRepository) {}

    async save(createTimecardDto: CreateTimecardDto, user: JwtResponse) {
        let newTimecard: Prisma.TimecardCreateInput;

        if (this.validateUserIsAdmin(user)) {
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

    async getByUserId(userId: number, user: JwtResponse) {
        if (this.validateUserIsAdmin(user)) {
            const userExists = await this.validateUserId(userId);

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
        const timecard = await this.validateTimecardId(timecardId);

        if (this.validateUserIsAdmin(user)) {
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
        const validateTimecardId = await this.validateTimecardId(timecardId);

        if (validateTimecardId) {
            if (this.validateUserIsAdmin(user)) {
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
        const validateTimecardId = await this.validateTimecardId(timecardId);

        if (validateTimecardId) {
            if (this.validateUserIsAdmin(user)) {
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
}
