import { Test, TestingModule } from '@nestjs/testing';
import { EstadisticaService } from './estadistica.service';

describe('EstadisticaService', () => {
  let service: EstadisticaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadisticaService],
    }).compile();

    service = module.get<EstadisticaService>(EstadisticaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
