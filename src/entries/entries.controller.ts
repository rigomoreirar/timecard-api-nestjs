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
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';

@Controller('timecards/:timecardId/entries')
export class EntriesController {
    constructor(private readonly entriesService: EntriesService) {}

    @Post()
    save(
        @Param('timecardId', ParseIntPipe) timecardId: number,
        @Body() createEntryDto: CreateEntryDto,
    ) {
        return this.entriesService.save(createEntryDto, timecardId);
    }

    @Get()
    getAll(@Param('timecardId', ParseIntPipe) timecardId: number) {
        return this.entriesService.getAll(timecardId);
    }

    @Get(':entriesId')
    getById(
        @Param('timecardId', ParseIntPipe) timecardId: number,
        @Param('entriesId', ParseIntPipe) entriesId: number,
    ) {
        return this.entriesService.getById(timecardId, entriesId);
    }

    @Patch(':entriesId')
    update(
        @Param('timecardId', ParseIntPipe) timecardId: number,
        @Param('entriesId', ParseIntPipe) entriesId: number,
        @Body() updateEntryDto: UpdateEntryDto,
    ) {
        return this.entriesService.update(
            updateEntryDto,
            timecardId,
            entriesId,
        );
    }

    @Delete(':entriesId')
    delete(
        @Param('timecardId', ParseIntPipe) timecardId: number,
        @Param('entriesId', ParseIntPipe) entriesId: number,
    ) {
        return this.entriesService.delete(timecardId, entriesId);
    }
}
