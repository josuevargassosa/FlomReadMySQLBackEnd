import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { LibroDto, UpdateLibroDto } from 'src/libro/dto/libro.dto';
import { LibroService } from 'src/libro/services/libro.service';
import { Repository } from 'typeorm';
import { CreateLibroLectorDto, LibroLectorDto, prestamosLectorDto } from '../dto/libro-lector.dto';
import { UpdateLibroLectorDto } from '../dto/libro-lector.dto';
import { LibroLector } from '../entities/libro-lector.entity';

@Injectable()
export class LibroLectorService {

  constructor(
    @InjectRepository(LibroLector) private libroLectorRepo: Repository<LibroLector>,
    private libroService: LibroService,
  ) {
  }

  //PRESTAMO
  async create(createLibroLectorDto: CreateLibroLectorDto): Promise<CreateLibroLectorDto | string> {
    var libro: LibroDto = await this.libroService.findOne(createLibroLectorDto.idLibro);
    if (libro.estado == 'A') {
      const nuevoDato = await this.libroLectorRepo.create(createLibroLectorDto);
      const guardarlibroPrestamo: LibroLector = await this.libroLectorRepo.save(nuevoDato);
      console.log('PRESTAMO',guardarlibroPrestamo);
      
      const librosCount = await this.libroLectorRepo.count({
        where: {
          idLibro: guardarlibroPrestamo.idLibro,
          estado: 'P'
        }
      });
  
      if (librosCount == libro.cantidad) {
        this.cambiarEstado(libro, 'P');
      } 
      return plainToClass(CreateLibroLectorDto, guardarlibroPrestamo)

    } else {
      return 'El libro no esta disponible'
    }



    // await this.cambiarEstado(libro, 'P');
  }

  cambiarEstado(libro: LibroDto, estado: string) {
    const updateLibro = {
      id: libro.id,
      nombre: libro.nombre,
      autor: libro.autor,
      resumen: libro.resumen,
      fotoPortada: libro.fotoPortada,
      estado: estado,
      codigo: libro.codigo,
      cantidad: libro.cantidad,
    }
    this.libroService.update(libro.id, updateLibro);
  }

  async getPrestamos(): Promise<LibroLectorDto[]> {
    const prestamos: LibroLector[] = await this.libroLectorRepo.find(
      {
        relations: [
          "libro",
          "lector"
        ]
      }
    );
    // this.calcularTiempo(prestamos);
    return prestamos.map((libro: LibroLector) => plainToClass(LibroLectorDto, libro))
  }

  calcularTiempo(prestamos: LibroLector[]) {
    prestamos.forEach((libro: LibroLector) => {
      var fechaActual = new Date();
      var fechaPrestamo = new Date(libro.fechaCreacion);
      var tiempo = fechaActual.getTime() - fechaPrestamo.getTime();
      var dias = tiempo / (1000 * 3600 * 24);
      // libro.tiempo = Math.round(dias);
    });
  }

  // async findPrestamoById(idPrestamo: number): Promise<prestamosLectorDto> {
  //   console.log(idPrestamo);
  //   const dataPrestamo: LibroLector = await this.libroLectorRepo.findOneBy({
  //     id: idPrestamo,
  //   });
    
  //   console.log(dataPrestamo);
  //   if (!dataPrestamo) {
  //     throw new NotFoundException(`Prestamo no encaaaontrado`);
  //   }
  //   return plainToClass(prestamosLectorDto, dataPrestamo)
  // }

  async findOne(idLector: number): Promise<prestamosLectorDto[]> {
    const dataPrestamo2: LibroLector[] = await this.libroLectorRepo.find({
      where: {
        idLector: idLector
      },
      relations: [
        "libro",
      ]
    }) 
    console.log(dataPrestamo2);
    if (!dataPrestamo2) {
      throw new NotFoundException(`Prestamo del lector #${idLector} no encontrado`);
    }
    return dataPrestamo2.map((prestamo: LibroLector) => plainToClass(prestamosLectorDto, prestamo))
  }

  async cantidadLibrosLeidos(): Promise<number> {
    const libros = await this.libroLectorRepo.count({
      where: {
        estado: 'L'
      }
    });
    return libros
  }

  async cantidadLibrosPrestados(): Promise<number> {
    const libros = await this.libroLectorRepo.count({
      where: {
        estado: 'P'
      }
      // relation: [
      //   "libro", "libro.precio",
      //   "lector", "lector.precio"
      // ]
    });
    return libros
  }

  update(id: number, updateLibroLectorDto: UpdateLibroLectorDto) {
    return `This action updates a #${id} libroLector`;
  }

  remove(id: number) {
    return `This action removes a #${id} libroLector`;
  }
}
