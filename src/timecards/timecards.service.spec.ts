import { Test, TestingModule } from '@nestjs/testing';
import { TimecardsService } from './timecards.service';

describe('TimecardsService', () => {
    let service: TimecardsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TimecardsService],
        }).compile();

        service = module.get<TimecardsService>(TimecardsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
