import { Injectable } from '@nestjs/common';
import { CreateTimecardDto } from './dto/create-timecard.dto';
import { UpdateTimecardDto } from './dto/update-timecard.dto';

@Injectable()
export class TimecardsService {
  create(createTimecardDto: CreateTimecardDto) {
    return 'This action adds a new timecard';
  }

  findAll() {
    return `This action returns all timecards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} timecard`;
  }

  update(id: number, updateTimecardDto: UpdateTimecardDto) {
    return `This action updates a #${id} timecard`;
  }

  remove(id: number) {
    return `This action removes a #${id} timecard`;
  }
}
