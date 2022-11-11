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
    //return await this.libroLectorRepo.query("SP_EstadisticasEspecificas @TipoEstadistica ='" + 'libros5' + "'");  
    const libros5 = await this.libroLectorRepo.query(`call ${process.env.DB_NAME}.SP_EstadisticasEspecificas('libros5')`);
    return libros5[0];
  }

  async getTop5Instituciones() {
    // return await this.libroLectorRepo.query("SP_EstadisticasEspecificas @TipoEstadistica ='" + 'instituciones5' + "'"); 
    const instituciones5 = await this.libroLectorRepo.query(`call ${process.env.DB_NAME}.SP_EstadisticasEspecificas('instituciones5')`);
    return instituciones5[0];
  }

  async getTop5Lectores() {
    // return await this.libroLectorRepo.query("SP_EstadisticasEspecificas @TipoEstadistica ='" + 'lectores5' + "'"); 
    const lectores5 = await this.libroLectorRepo.query(`call ${process.env.DB_NAME}.SP_EstadisticasEspecificas('lectores5')`);
    return lectores5[0];
  }
}
