import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { LibroService } from '../services/libro.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateLibroDto, UpdateLibroDto } from '../dto/libro.dto';

@ApiTags('Libro')
@Controller('libro')
export class LibroController {
  constructor(private readonly libroService: LibroService) {}

  @Post()
  create(@Body() createLibroDto: CreateLibroDto) {
    return this.libroService.create(createLibroDto);
  }

  @Get()
  findAll() {
    return this.libroService.findAll();
  }

  @Get('Count')
  countAll() {
    return this.libroService.countAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.libroService.findOne(+id);
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() updateLibroDto: UpdateLibroDto) {
    return this.libroService.update(+id, updateLibroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.libroService.remove(+id);
  }
}
