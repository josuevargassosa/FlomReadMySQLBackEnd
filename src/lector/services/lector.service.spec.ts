import { Test, TestingModule } from '@nestjs/testing';
import { LectorService } from './lector.service';

describe('LectorService', () => {
  let service: LectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LectorService],
    }).compile();

    service = module.get<LectorService>(LectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
