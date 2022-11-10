import { Test, TestingModule } from '@nestjs/testing';
import { LibroLectorController } from './libro-lector.controller';
import { LibroLectorService } from './libro-lector.service';

describe('LibroLectorController', () => {
  let controller: LibroLectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibroLectorController],
      providers: [LibroLectorService],
    }).compile();

    controller = module.get<LibroLectorController>(LibroLectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
