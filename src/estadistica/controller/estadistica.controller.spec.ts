import { Test, TestingModule } from '@nestjs/testing';
import { EstadisticaController } from './estadistica.controller';
import { EstadisticaService } from '../estadistica.service';

describe('EstadisticaController', () => {
  let controller: EstadisticaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadisticaController],
      providers: [EstadisticaService],
    }).compile();

    controller = module.get<EstadisticaController>(EstadisticaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
