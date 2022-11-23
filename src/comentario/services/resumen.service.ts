import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import {
  CreateResumanDto,
  ResumenDto,
  UpdateResumanDto,
} from '../dto/resumen.dto';
import { Comentario } from '../entities/resuman.entity';

@Injectable()
export class ResumenService {
  constructor(
    @InjectRepository(Comentario)
    private comentarioRepo: Repository<Comentario>,
  ) {}

  async create(
    createComentarioDto: CreateResumanDto,
  ): Promise<CreateResumanDto | string> {
    const nuevoDato = await this.comentarioRepo.create(createComentarioDto);
    const guardarComentario: Comentario = await this.comentarioRepo.save(
      nuevoDato,
    );
    const query = await this.comentarioRepo.query(
      `call ${process.env.DB_NAME}.SP_CambioEstado(?,?,?)`,
      ['L', guardarComentario.idLibroLector, 'Prestamo'],
    );
    return plainToClass(CreateResumanDto, guardarComentario);
  }

  async findAll(): Promise<ResumenDto[]> {
    const comentarios: Comentario[] = await this.comentarioRepo.find({
      relations: ['libro', 'lector'],
    });
    return comentarios.map((resumen: Comentario) =>
      plainToClass(ResumenDto, resumen),
    );
  }

  async findComentarioByIdPrestamo(idPrestamo: number) {
    const resumen: Comentario = await this.comentarioRepo.findOneBy({
      idLibroLector: idPrestamo,
    });
    if (!resumen) {
      throw new NotFoundException(`resumen no encontrado`);
    }
    return plainToClass(ResumenDto, resumen);
  }
  update(id: number, updateResumanDto: UpdateResumanDto) {
    return `This action updates a #${id} resuman`;
  }

  remove(id: number) {
    return `This action removes a #${id} resuman`;
  }
}
