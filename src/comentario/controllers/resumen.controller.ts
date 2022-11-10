import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResumenService } from '../services/resumen.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateResumanDto, UpdateResumanDto } from '../dto/resumen.dto';

@ApiTags('Comentario')
@Controller('Comentario')
export class ResumenController {
  constructor(private readonly resumenService: ResumenService) {}

  @Post()
  create(@Body() createResumanDto: CreateResumanDto) {
    return this.resumenService.create(createResumanDto);
  }

  @Get()
  findAll() {
    return this.resumenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resumenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResumanDto: UpdateResumanDto) {
    return this.resumenService.update(+id, updateResumanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resumenService.remove(+id);
  }
}
