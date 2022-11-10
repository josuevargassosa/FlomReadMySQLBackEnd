import { Test, TestingModule } from '@nestjs/testing';
import { LibroController } from './libro.controller';
import { LibroService } from '../services/libro.service';

describe('LibroController', () => {
  let controller: LibroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibroController],
      providers: [LibroService],
    }).compile();

    controller = module.get<LibroController>(LibroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
