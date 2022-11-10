import { Module } from '@nestjs/common';
import { LectorController } from './controllers/lector.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lector } from './entities/lector.entity';
import { LectorService } from './services/lector.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lector])],
  controllers: [LectorController],
  providers: [LectorService],
  exports: [LectorService]
})
export class LectorModule {}
