import { Module } from '@nestjs/common';
import { EstadisticaService } from './services/estadistica.service';
import { EstadisticaController } from './controller/estadistica.controller';
import { LibroLectorModule } from 'src/libro-lector/libro-lector.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibroLector } from 'src/libro-lector/entities/libro-lector.entity';
import { LibroLectorService } from 'src/libro-lector/services/libro-lector.service';

@Module({
  imports: [TypeOrmModule.forFeature([LibroLector])],
  controllers: [EstadisticaController],
  providers: [EstadisticaService],
  exports: [EstadisticaService]

})
export class EstadisticaModule {}
