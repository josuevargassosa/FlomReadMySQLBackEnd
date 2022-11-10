import { Module } from '@nestjs/common';
import { LibroService } from './services/libro.service';
import { LibroController } from './controllers/libro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from './entities/libro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Libro])],
  controllers: [LibroController],
  providers: [LibroService],
  exports: [LibroService]
})
export class LibroModule {}
