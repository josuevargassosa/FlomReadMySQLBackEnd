import { Test, TestingModule } from '@nestjs/testing';
import { LectorController } from './lector.controller';
import { LectorService } from '../services/lector.service';

describe('LectorController', () => {
  let controller: LectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LectorController],
      providers: [LectorService],
    }).compile();

    controller = module.get<LectorController>(LectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
