import { Module } from '@nestjs/common';
import { ResumenService } from './services/resumen.service';
import { ResumenController } from './controllers/resumen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comentario } from './entities/resuman.entity';
import { LibroModule } from 'src/libro/libro.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comentario]), LibroModule],
  controllers: [ResumenController],
  providers: [ResumenService],
  exports: [ResumenService]
})
export class ComentarioModule {}
