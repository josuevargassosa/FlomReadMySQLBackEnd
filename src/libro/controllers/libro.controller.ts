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
import { LibroService } from '../services/libro.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateLibroDto, UpdateLibroDto } from '../dto/libro.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post('cargar-foto')
  // @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    const tipoFoto: String = 'libro';
    return this.libroService.uploadImageToCloudinary(tipoFoto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.libroService.removeLibro(+id);
  }
}
