import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { CreateLibroDto, LibroDto, UpdateLibroDto } from '../dto/libro.dto';
import { Libro } from '../entities/libro.entity';

@Injectable()
export class LibroService {
  constructor(
    @InjectRepository(Libro) private libroRepo: Repository<Libro>,
    private cloudinary: CloudinaryService,
  ) {}

  async create(createLibroDto: CreateLibroDto): Promise<LibroDto> {
    const libro = await this.libroRepo.findOneBy({
      codigo: createLibroDto.codigo,
    });
    if (libro) {
      throw new BadRequestException(
        `El código ${createLibroDto.codigo} del libro ya existe`,
      );
    } else {
      const nuevoDato = await this.libroRepo.create(createLibroDto);
      const guardarlibro: Libro = await this.libroRepo.save(nuevoDato);
      return plainToClass(LibroDto, guardarlibro);
    }
  }

  async findByCodigo(codigo: string): Promise<LibroDto> {
    const libro: Libro = await this.libroRepo.findOneBy({
      codigo: codigo,
    });
    if (!libro) {
      throw new NotFoundException(`Libro #${codigo} no encontrado`);
    }
    return plainToClass(LibroDto, libro);
  }

  async findAll(): Promise<LibroDto[]> {
    const libros: Libro[] = await this.libroRepo.find({
      where: [
        {
          estado: 'A',
        },
        {
          estado: 'P',
        },
      ],
    });
    console.log(libros);
    return libros.map((libro: Libro) => plainToClass(LibroDto, libro));
  }

  async uploadImageToCloudinary(tipoFoto, file: Express.Multer.File) {
    return await this.cloudinary.upload(tipoFoto, file).catch((e) => {
      throw new BadRequestException('Invalid file type.', e);
    });
  }

  async countAll(): Promise<number> {
    let contador = 0;
    const libros = this.findAll();
    (await libros).forEach((libro: LibroDto) => {
      contador = contador + libro.cantidad;
    });
    return contador;
  }

  async findOne(idLibro): Promise<LibroDto> {
    const libro: Libro = await this.libroRepo.findOneBy({
      id: idLibro,
    });
    if (!libro) {
      throw new NotFoundException(`Promoción #${idLibro} no encontrado`);
    }
    return plainToClass(LibroDto, libro);
  }

  async findLibroByCodigo(codigo: string): Promise<LibroDto> {
    const libro: Libro = await this.libroRepo.findOneBy({
      codigo: codigo,
    });
    if (!libro) {
      throw new NotFoundException(`Libro #${codigo} no encontrado`);
    }
    return plainToClass(LibroDto, libro);
  }

  async update(id: any, updateLibroDto: UpdateLibroDto): Promise<LibroDto> {
    const libro = await this.libroRepo.findOneBy({
      id: id,
    });
    if (updateLibroDto.estado == 'A') {
      updateLibroDto = {
        autor: updateLibroDto.autor,
        cantidad: updateLibroDto.cantidad,
        estado:
          updateLibroDto.cantidad == 0
            ? (libro.estado = 'P')
            : (libro.estado = 'A'),
        nombre: updateLibroDto.nombre,
        codigo: updateLibroDto.codigo,
        fotoPortada: updateLibroDto.fotoPortada,
        resumen: updateLibroDto.resumen,
      };
    } else {
      updateLibroDto = {
        autor: updateLibroDto.autor,
        cantidad: updateLibroDto.cantidad,
        estado:
          libro.cantidad < updateLibroDto.cantidad
            ? (libro.estado = 'A')
            : (libro.estado = 'P'),
        nombre: updateLibroDto.nombre,
        codigo: updateLibroDto.codigo,
        fotoPortada: updateLibroDto.fotoPortada,
        resumen: updateLibroDto.resumen,
      };
    }
    this.libroRepo.merge(libro, updateLibroDto);
    const guardarDato: LibroDto = await this.libroRepo.save(libro);
    return plainToClass(LibroDto, guardarDato);
  }

  async cambiarEstadoLibro(id: number, estado: string): Promise<LibroDto> {
    const libro = await this.libroRepo.findOneBy({ id: id });
    libro.estado = estado;
    const guardarDato: Libro = await this.libroRepo.save(libro);
    return plainToClass(LibroDto, guardarDato);
  }

  async ajusteCantidadLibro(libro, cantidad) {
    libro.cantidad = cantidad;
    const guardarDato: LibroDto = await this.libroRepo.save(libro);
    return plainToClass(LibroDto, guardarDato);
  }

  async removeLibro(id: number) {
    console.log('ID LIBRO', id);
    const libro = await this.libroRepo.findOneBy({ id: id });
    console.log('LIBRO', libro);
    if (!libro) {
      throw new NotFoundException(`No se encuentra el libro especificado`);
    }
    libro.estado = 'I';
    const data = await this.libroRepo.save(libro);
    if (data)
      return {
        message: 'Libro eliminado correctamente',
      };
  }
}
