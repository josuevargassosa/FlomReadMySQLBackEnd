import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrador } from './entities/administrador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Administrador])],
  controllers: [],
})
export class LectorModule {}
