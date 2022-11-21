import { Injectable } from '@nestjs/common';
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
<<<<<<< Updated upstream
    const guardarComentario: Comentario = await this.comentarioRepo.save(nuevoDato);
    const query = await this.comentarioRepo.query(`call ${process.env.DB_NAME}.SP_CambioEstado(?,?,?)`, ['L', guardarComentario.idLibroLector, 'Prestamo']);
    console.log(query[0]);
    return plainToClass(CreateResumanDto, guardarComentario)
=======
    const guardarComentario: Comentario = await this.comentarioRepo.save(
      nuevoDato,
    );
    console.log(createComentarioDto);
    const libros5 = await this.comentarioRepo.query(
      `call ${process.env.DB_NAME}.SP_CambioEstado(?,?,?)`,
      ['L', createComentarioDto.idLibroLector, 'Prestamo'],
    );
    console.log(libros5[0]);
    return plainToClass(CreateResumanDto, guardarComentario);
>>>>>>> Stashed changes
  }

  async findAll(): Promise<ResumenDto[]> {
    const comentarios: Comentario[] = await this.comentarioRepo.find({
      relations: ['libro', 'lector'],
    });
    console.log(comentarios);
    return comentarios.map((resumen: Comentario) =>
      plainToClass(ResumenDto, resumen),
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} resuman`;
  }

  update(id: number, updateResumanDto: UpdateResumanDto) {
    return `This action updates a #${id} resuman`;
  }

  remove(id: number) {
    return `This action removes a #${id} resuman`;
  }
}
