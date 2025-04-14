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
import { AuthGuard } from '@nestjs/passport';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { JwtResponse } from 'src/auth/auth.interface';

@Controller('timecards/:timecardId/entries')
export class EntriesController {
    constructor(private readonly entriesService: EntriesService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    save(
        @Param('timecardId', ParseIntPipe) timecardId: number,
        @Body() createEntryDto: CreateEntryDto,
        @AuthUser() user: JwtResponse,
    ) {
        return this.entriesService.save(createEntryDto, timecardId, user);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    getAll(
        @Param('timecardId', ParseIntPipe) timecardId: number,
        @AuthUser() user: JwtResponse,
    ) {
        return this.entriesService.getAll(timecardId, user);
    }

    @Get(':entriesId')
    @UseGuards(AuthGuard('jwt'))
    getById(
        @Param('timecardId', ParseIntPipe) timecardId: number,
        @Param('entriesId', ParseIntPipe) entriesId: number,
        @AuthUser() user: JwtResponse,
    ) {
        return this.entriesService.getById(timecardId, entriesId, user);
    }

    @Patch(':entriesId')
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('timecardId', ParseIntPipe) timecardId: number,
        @Param('entriesId', ParseIntPipe) entriesId: number,
        @Body() updateEntryDto: UpdateEntryDto,
        @AuthUser() user: JwtResponse,
    ) {
        return this.entriesService.update(
            updateEntryDto,
            timecardId,
            entriesId,
            user,
        );
    }

    @Delete(':entriesId')
    @UseGuards(AuthGuard('jwt'))
    delete(
        @Param('timecardId', ParseIntPipe) timecardId: number,
        @Param('entriesId', ParseIntPipe) entriesId: number,
        @AuthUser() user: JwtResponse,
    ) {
        return this.entriesService.delete(timecardId, entriesId, user);
    }
}
