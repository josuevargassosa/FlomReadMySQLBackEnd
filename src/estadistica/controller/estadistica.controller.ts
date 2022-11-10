import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadisticaService } from './../services/estadistica.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Estadistica')
@Controller('estadistica')
export class EstadisticaController {
  constructor(private readonly estadisticaService: EstadisticaService) {}

  @Get('top5Libros')
  findAllLibros() {
    return this.estadisticaService.getTop5Libros();
  }

  @Get('top5Instituciones')
  findAllInstituciones() {
    return this.estadisticaService.getTop5Instituciones();
  }

  @Get('top5Lectores')
  findAlLectores() {
    return this.estadisticaService.getTop5Lectores();
  }
}
