import { Test, TestingModule } from '@nestjs/testing';
import { LibroLectorService } from './libro-lector.service';

describe('LibroLectorService', () => {
  let service: LibroLectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LibroLectorService],
    }).compile();

    service = module.get<LibroLectorService>(LibroLectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
