import { Injectable } from '@nestjs/common';
import { EstadisticaLibroDto, EstadisticaLectorDto } from '../dto/create-estadistica.dto';
import { LibroService } from 'src/libro/services/libro.service';
import { LibroLector } from 'src/libro-lector/entities/libro-lector.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EstadisticaService {
  constructor(
    @InjectRepository(LibroLector) private libroLectorRepo: Repository<LibroLector>,
  ) {
  }


  async getTop5Libros() {
    return await this.libroLectorRepo.query("SP_EstadisticasEspecificas @TipoEstadistica = 'libros5'");  
  }

  // async find(email: string): Promise<Usuario[]>{
  //   return await this.usuariosRepository.query("sp_prueba @email='"+email +"'");
  // }



  async getTop5Instituciones() {
    return await this.libroLectorRepo.query("SP_EstadisticasEspecificas @TipoEstadistica = 'instituciones5'"); 
  }

  async getTop5Lectores() {
    return await this.libroLectorRepo.query("SP_EstadisticasEspecificas @TipoEstadistica = 'lectores5'"); 
  }
}
