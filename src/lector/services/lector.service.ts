import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { RelationId, Repository } from 'typeorm';
import { CreateLectorDto, LectorDto, UpdateLectorDto } from '../dto/lector.dtos';
import { Lector } from '../entities/lector.entity';

@Injectable()
export class LectorService {

  constructor(
    @InjectRepository(Lector) private lectorRepo: Repository<Lector>,
  ) {
  }

  async create(createLectorDto: CreateLectorDto): Promise<LectorDto> {
    const nuevoDato = await this.lectorRepo.create(createLectorDto);
    const guardarLector: Lector = await this.lectorRepo.save(nuevoDato);
    return plainToClass(LectorDto, guardarLector)
  }

  async findAll(): Promise<LectorDto[]> {
    const lectores: Lector[] = await this.lectorRepo.find();
    return lectores.map((lector: Lector) => plainToClass(LectorDto, lector))
  }

  async countAll(): Promise<number> {
    const lectores = await this.lectorRepo.count();
    return lectores
  }

  async findOne(idLector): Promise<LectorDto> {
    const lector: Lector = await this.lectorRepo.findOneBy({
      id: idLector,
    }) 
    if (!lector) {
      throw new NotFoundException(`Promoción #${idLector} no encontrado`);
    }
    return plainToClass(LectorDto, lector)
  }

  async update(id, updateLectorDto: UpdateLectorDto): Promise<LectorDto> {
    console.log('updateLectorDto', updateLectorDto, id)
    const lector = await this.lectorRepo.findOneBy({id: id});
    console.log('lector', lector)
    this.lectorRepo.merge(lector, updateLectorDto);
    const guardarDato: LectorDto = await this.lectorRepo.save(lector);
    return plainToClass(LectorDto, guardarDato)
  }

  remove(id: number) {
    return `This action removes a #${id} lector`;
  }
}
