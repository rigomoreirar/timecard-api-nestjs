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
    create(@Body() createTimecardDto: CreateTimecardDto) {
        return this.timecardsService.create(createTimecardDto);
    }

    @Get()
    findAll() {
        return this.timecardsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.timecardsService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTimecardDto: UpdateTimecardDto,
    ) {
        return this.timecardsService.update(id, updateTimecardDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.timecardsService.remove(id);
    }
}
