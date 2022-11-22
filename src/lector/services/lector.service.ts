import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { RelationId, Repository } from 'typeorm';
import {
  CreateLectorDto,
  LectorDto,
  UpdateLectorDto,
} from '../dto/lector.dtos';
import { Lector } from '../entities/lector.entity';

@Injectable()
export class LectorService {
  constructor(
    @InjectRepository(Lector) private lectorRepo: Repository<Lector>,
    private cloudinary: CloudinaryService,
  ) {}

  async create(createLectorDto: CreateLectorDto): Promise<LectorDto> {
    const existe = await this.validarCorreo(createLectorDto.correo);
    if (existe) {
      throw new NotFoundException(`Correo ${createLectorDto.correo} ya existe`);
    } else {
      const nuevoDato = await this.lectorRepo.create(createLectorDto);
      const guardarLector: Lector = await this.lectorRepo.save(nuevoDato);
      return plainToClass(LectorDto, guardarLector);
    }
  }

  async validarCorreo(correo: string) {
    const existe = await this.lectorRepo.findOneBy({ correo: correo });
    return existe;
  }

  async findAll(): Promise<LectorDto[]> {
    const lectores: Lector[] = await this.lectorRepo.find({
      where: {
        estado: 'A',
      },
    });
    return lectores.map((lector: Lector) => plainToClass(LectorDto, lector));
  }

  async uploadImageToCloudinary(tipoFoto, file: Express.Multer.File) {
    return await this.cloudinary.upload(tipoFoto, file).catch((e) => {
      throw new BadRequestException('Invalid file type.', e);
    });
  }

  async countAll(): Promise<number> {
    const lectores = await this.lectorRepo.count({
      where: {
        estado: 'A',
      },
    });
    return lectores;
  }

  async findOne(idLector): Promise<LectorDto> {
    const lector: Lector = await this.lectorRepo.findOneBy({
      id: idLector,
      estado: 'A',
    });
    if (!lector) {
      throw new NotFoundException(`Promoción #${idLector} no encontrado`);
    }
    return plainToClass(LectorDto, lector);
  }

  async update(id, updateLectorDto: UpdateLectorDto): Promise<LectorDto> {
    const lector = await this.lectorRepo.findOneBy({ id: id, estado: 'A' });
    this.lectorRepo.merge(lector, updateLectorDto);
    const guardarDato: LectorDto = await this.lectorRepo.save(lector);
    return plainToClass(LectorDto, guardarDato);
  }

  async cambiarEstadoLector(id: number, estado: string): Promise<LectorDto> {
    const lector = await this.lectorRepo.findOneBy({ id: id });
    console.log(lector);
    lector.estado = estado;
    const guardarDato: Lector = await this.lectorRepo.save(lector);
    console.log(guardarDato);
    return plainToClass(LectorDto, guardarDato);
  }

  async removeLector(id: number) {
    console.log('ID LIBRO', id);
    const libro = await this.lectorRepo.findOneBy({ id: id });
    console.log('LIBRO', libro);
    if (!libro) {
      throw new NotFoundException(`No se encuentra el lector especificado`);
    }
    libro.estado = 'I';
    const data = await this.lectorRepo.save(libro);
    if (data)
      return {
        message: 'Lector eliminado correctamente',
      };
  }
}
