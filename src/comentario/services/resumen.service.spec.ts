import { Test, TestingModule } from '@nestjs/testing';
import { ResumenService } from './resumen.service';

describe('ResumenService', () => {
  let service: ResumenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResumenService],
    }).compile();

    service = module.get<ResumenService>(ResumenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
