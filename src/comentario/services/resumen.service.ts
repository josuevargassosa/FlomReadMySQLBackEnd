import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateResumanDto, ResumenDto, UpdateResumanDto } from '../dto/resumen.dto';
import { Comentario } from '../entities/resuman.entity';

@Injectable()
export class ResumenService {

  constructor(
    @InjectRepository(Comentario) private comentarioRepo: Repository<Comentario>,
  ) {
  }
  
  async create(createComentarioDto: CreateResumanDto): Promise<CreateResumanDto | string> {
    const nuevoDato = await this.comentarioRepo.create(createComentarioDto);
    const guardarComentario: Comentario = await this.comentarioRepo.save(nuevoDato);
    return plainToClass(CreateResumanDto, guardarComentario)
  }

  async findAll(): Promise<ResumenDto[]> {
    const comentarios: Comentario[] = await this.comentarioRepo.find(
      {
        relations: [
          "libro",
          "lector"
        ]
      }
    );
    console.log(comentarios);
    return comentarios.map((resumen: Comentario ) => plainToClass(ResumenDto, resumen))
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
