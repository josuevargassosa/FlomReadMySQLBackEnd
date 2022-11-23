import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNumber } from 'class-validator';


@Exclude()
export class ResumenDto {
  @Expose()
  @ApiProperty()
  readonly id: number;
  
  @Expose()
  @ApiProperty()
  readonly lector: number;

  @Expose()
  @ApiProperty()
  readonly libro: number;

  @Expose()
  @ApiProperty()
  readonly idLibroLector: number;

  @Expose()
  @ApiProperty()
  readonly descripcion: string;

  @Expose()
  @ApiProperty()
  readonly fechaCreacion: Date;
}


export class CreateResumanDto {
  @IsNumber()
  @Expose()
  @ApiProperty()
  readonly idLibroLector: number;

  @IsNumber()
  @Expose()
  @ApiProperty()
  readonly idLector: number;

  @IsNumber()
  @Expose()
  @ApiProperty()
  readonly idLibro: number;

  @Expose()
  @ApiProperty()
  readonly descripcion: string;
}

export class UpdateResumanDto extends PartialType(CreateResumanDto) {}
