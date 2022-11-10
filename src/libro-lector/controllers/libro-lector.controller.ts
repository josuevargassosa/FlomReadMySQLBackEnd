import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LibroLectorService } from '../services/libro-lector.service';
import { CreateLibroLectorDto } from '../dto/libro-lector.dto';
import { UpdateLibroLectorDto } from '../dto/libro-lector.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('LibroLector')
@Controller('LibroLector')
export class LibroLectorController {
  constructor(private readonly libroLectorService: LibroLectorService) {}

  @Post()
  create(@Body() createLibroLectorDto: CreateLibroLectorDto) {
    return this.libroLectorService.create(createLibroLectorDto);
  }

  @Get()
  findAll() {
    return this.libroLectorService.getPrestamos();
  }

  @Get('Cantidad/Leidos')
  cantidadLeidos() {
    return this.libroLectorService.cantidadLibrosLeidos();
  }

  @Get('Cantidad/Prestados')
  countAll() {
    return this.libroLectorService.cantidadLibrosPrestados();
  }

  // @Get(':idPrestamo')
  // findByIdPrestamo(@Param('idPrestamo') idPrestamo: number) {
  //   return this.libroLectorService.findPrestamoById(idPrestamo);
  // }

  @Get(':idLector')
  findOne(@Param('idLector') id: number) {
    return this.libroLectorService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLibroLectorDto: UpdateLibroLectorDto) {
  //   return this.libroLectorService.update(+id, updateLibroLectorDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.libroLectorService.remove(+id);
  }
}
