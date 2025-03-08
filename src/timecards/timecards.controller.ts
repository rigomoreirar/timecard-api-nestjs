import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';
import { TimecardsService } from './timecards.service';
import { CreateTimecardDto } from './dto/create-timecard.dto';
import { UpdateTimecardDto } from './dto/update-timecard.dto';

@Controller('timecards')
export class TimecardsController {
    constructor(private readonly timecardsService: TimecardsService) {}

    @Post()
    save(@Body() createTimecardDto: CreateTimecardDto) {
        return this.timecardsService.save(createTimecardDto);
    }

    @Get()
    getAll() {
        return this.timecardsService.getAll();
    }

    @Get('/users')
    getAllUsers() {
        return this.timecardsService.getAllUsers();
    }

    @Get('/users/:userId')
    getByUserId(@Param('userId', ParseIntPipe) userId: number) {
        return this.timecardsService.getByUserId(userId);
    }

    @Get(':timecardId')
    getById(@Param('timecardId', ParseIntPipe) timecardId: number) {
        return this.timecardsService.getById(timecardId);
    }

    @Patch(':timecardId')
    update(
        @Param('timecardId', ParseIntPipe) timecardId: number,
        @Body() updateTimecardDto: UpdateTimecardDto,
    ) {
        return this.timecardsService.update(timecardId, updateTimecardDto);
    }

    @Delete(':timecardId')
    delete(@Param('timecardId', ParseIntPipe) timecardId: number) {
        return this.timecardsService.delete(timecardId);
    }
}
