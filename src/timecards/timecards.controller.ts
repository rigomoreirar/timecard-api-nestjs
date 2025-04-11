import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { TimecardsService } from './timecards.service';
import { CreateTimecardDto } from './dto/create-timecard.dto';
import { UpdateTimecardDto } from './dto/update-timecard.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminRoleGuard } from 'src/common/guards/admin-role.guard';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { JwtResponse } from 'src/auth/auth.interface';

@Controller('timecards')
export class TimecardsController {
    constructor(private readonly timecardsService: TimecardsService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    save(
        @Body() createTimecardDto: CreateTimecardDto,
        @AuthUser() user: JwtResponse,
    ) {
        return this.timecardsService.save(createTimecardDto, user);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'), AdminRoleGuard)
    getAll() {
        return this.timecardsService.getAll();
    }

    @Get('/users')
    @UseGuards(AuthGuard('jwt'), AdminRoleGuard)
    getAllUsers() {
        return this.timecardsService.getAllUsers();
    }

    @Get('/users/:userId')
    @UseGuards(AuthGuard('jwt'))
    getByUserId(
        @Param('userId', ParseIntPipe) userId: number,
        @AuthUser() user: JwtResponse,
    ) {
        return this.timecardsService.getByUserId(userId, user);
    }

    @Get(':timecardId')
    @UseGuards(AuthGuard('jwt'))
    getById(
        @Param('timecardId', ParseIntPipe) timecardId: number,
        @AuthUser() user: JwtResponse,
    ) {
        return this.timecardsService.getById(timecardId, user);
    }

    @Patch(':timecardId')
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('timecardId', ParseIntPipe) timecardId: number,
        @Body() updateTimecardDto: UpdateTimecardDto,
        @AuthUser() user: JwtResponse,
    ) {
        return this.timecardsService.update(
            timecardId,
            updateTimecardDto,
            user,
        );
    }

    @Delete(':timecardId')
    @UseGuards(AuthGuard('jwt'))
    delete(
        @Param('timecardId', ParseIntPipe) timecardId: number,
        @AuthUser() user: JwtResponse,
    ) {
        return this.timecardsService.delete(timecardId, user);
    }
}
