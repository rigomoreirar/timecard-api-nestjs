import { Test, TestingModule } from '@nestjs/testing';
import { TimecardsController } from './timecards.controller';
import { TimecardsService } from './timecards.service';

describe('TimecardsController', () => {
  let controller: TimecardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimecardsController],
      providers: [TimecardsService],
    }).compile();

    controller = module.get<TimecardsController>(TimecardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
