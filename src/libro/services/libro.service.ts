import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateLibroDto, LibroDto, UpdateLibroDto } from '../dto/libro.dto';
import { Libro } from '../entities/libro.entity';

@Injectable()
export class LibroService {

  constructor(
    @InjectRepository(Libro) private libroRepo: Repository<Libro>,
  ) {
  }
  
  async create(createLibroDto: CreateLibroDto): Promise<LibroDto> {
    const nuevoDato = await this.libroRepo.create(createLibroDto);
    const guardarlibro: Libro = await this.libroRepo.save(nuevoDato);
    return plainToClass(LibroDto, guardarlibro)
  }

  async findAll(): Promise<LibroDto[]> {
    const libros: Libro[] = await this.libroRepo.find();
    return libros.map((libro: Libro ) => plainToClass(LibroDto, libro))
  }

  // async relacionfindAll(): Promise<LibroDto[]> {
  //   //LIBRO ESTUDIANTE
  //   const libros: Libro[] = await this.libroRepo.find({
  //     // relation: [
  //     //   "libro", "libro.precio",
  //     //   "lector", "lector.precio"
  //     // ]
  //   });
  //   return libros.map((libro: Libro ) => plainToClass(LibroDto, libro))
  // }

  async countAll(): Promise<number> {
    let contador = 0;
    const libros = this.findAll();
    (await libros).forEach((libro: LibroDto) => {
      contador = contador + libro.cantidad;
    });
    return contador;
  }

  // async countLibroPrestaodsfindAll(): Promise<number> {
  //   //LIBRO ESTUDIANTE
  //   const libros = await this.libroRepo.count({
  //     where: {
  //       estado: 'prestado'
  //     }
  //     // relation: [
  //     //   "libro", "libro.precio",
  //     //   "lector", "lector.precio"
  //     // ]
  //   });
  //   return libros
  // }

  async findOne(idLibro): Promise<LibroDto> {
    const libro: Libro = await this.libroRepo.findOneBy({
      id: idLibro,
    }) 
    if (!libro) {
      throw new NotFoundException(`Promoción #${idLibro} no encontrado`);
    }
    return plainToClass(LibroDto, libro)
  }

  async update(id: any, updateLibroDto: UpdateLibroDto): Promise<LibroDto> {
    const libro = await this.libroRepo.findOneBy({id: id});
    if (updateLibroDto.estado == 'A') {
      updateLibroDto = {
        autor: updateLibroDto.autor,
        cantidad: updateLibroDto.cantidad,
        estado: updateLibroDto.cantidad == 0 ? libro.estado = 'P' : libro.estado = 'A',
        nombre: updateLibroDto.nombre,
        codigo: updateLibroDto.codigo,
        fotoPortada: updateLibroDto.fotoPortada,
        resumen: updateLibroDto.resumen,
      }
    } else {
      updateLibroDto = {
        autor: updateLibroDto.autor,
        cantidad: updateLibroDto.cantidad,
        estado: libro.cantidad < updateLibroDto.cantidad ? libro.estado = 'A' : libro.estado = 'P',
        nombre: updateLibroDto.nombre,
        codigo: updateLibroDto.codigo,
        fotoPortada: updateLibroDto.fotoPortada,
        resumen: updateLibroDto.resumen,
      }
    }
    this.libroRepo.merge(libro, updateLibroDto);
    const guardarDato: LibroDto = await this.libroRepo.save(libro);
    return plainToClass(LibroDto, guardarDato)
  }

  async ajusteCantidadLibro(libro, cantidad) {
    libro.cantidad = cantidad;
    const guardarDato: LibroDto = await this.libroRepo.save(libro);
    return plainToClass(LibroDto, guardarDato)
  }

  remove(id: number) {
    return `This action removes a #${id} libro`;
  }
}
