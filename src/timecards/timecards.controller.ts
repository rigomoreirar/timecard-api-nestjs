import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    return this.timecardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimecardDto: UpdateTimecardDto) {
    return this.timecardsService.update(+id, updateTimecardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timecardsService.remove(+id);
  }
}
