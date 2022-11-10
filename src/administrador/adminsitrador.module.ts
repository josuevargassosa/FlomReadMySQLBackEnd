import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrador } from './entities/administrador.entity';
import { AdministradorService } from './services/administrador.service';

@Module({
  imports: [TypeOrmModule.forFeature([Administrador])],
  controllers: [],
  providers: [AdministradorService],
  exports: [AdministradorService]
})
export class LectorModule {}
