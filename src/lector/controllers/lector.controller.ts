import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { LectorService } from '../services/lector.service';
import { ApiTags } from '@nestjs/swagger';
import {
  actualizarFotoPerfilDto,
  CreateLectorDto,
  UpdateLectorDto,
} from '../dto/lector.dtos';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Get('correo/:correo')
  findLector(@Param('correo') correo: string) {
    return this.lectorService.validarCorreo(correo);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateLectorDto: UpdateLectorDto) {
    return this.lectorService.update(+id, updateLectorDto);
  }

  @Post('estado/:id/:estado')
  updateEstado(@Param('id') id: string, @Param('estado') estado: string) {
    return this.lectorService.cambiarEstadoLector(+id, estado);
  }

  @Post('cargar-foto')
  // @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    const tipoFoto: String = 'lector';
    return this.lectorService.uploadImageToCloudinary(tipoFoto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lectorService.removeLector(+id);
  }

  @Put('actualizar-foto/:id')
  actualizarFoto(
    @Param('id') id: string,
    @Body() foto: actualizarFotoPerfilDto,
  ) {
    return this.lectorService.actualizarFoto(+id, foto);
  }
}
