import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { LectorService } from '../services/lector.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateLectorDto, UpdateLectorDto } from '../dto/lector.dtos';

@ApiTags('Lector')
@Controller('lector')
export class LectorController {
  constructor(private readonly lectorService: LectorService) {}

  @Post()
  create(@Body() createLectorDto: CreateLectorDto) {
    return this.lectorService.create(createLectorDto);
  }

  @Get()
  findAll() {
    return this.lectorService.findAll();
  }

  @Get('Count')
  countAll() {
    return this.lectorService.countAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lectorService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateLectorDto: UpdateLectorDto) {
    return this.lectorService.update(+id, updateLectorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lectorService.remove(+id);
  }
}
