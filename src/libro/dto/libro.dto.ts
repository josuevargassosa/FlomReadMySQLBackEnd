import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';


@Exclude()
export class LibroDto {
  @Expose()
  @ApiProperty()
  readonly id: number;

  @Expose()
  @ApiProperty()
  readonly nombre: string;

  @Expose()
  @ApiProperty()
  readonly autor: string;

  @Expose()
  @ApiProperty()
  readonly resumen: string;

  @Expose()
  @ApiProperty()
  readonly fotoPortada: string;

  @Expose()
  @ApiProperty()
  readonly estado: string;

  @Expose()
  @ApiProperty()
  readonly codigo: string;

  @Expose()
  @ApiProperty()
  readonly cantidad: number;
}

export class CreateLibroDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly autor: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly resumen: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly fotoPortada: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly estado: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly codigo: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly cantidad: number;
}

export class UpdateLibroDto extends PartialType(CreateLibroDto) {

  @ApiProperty()
  readonly nombre: string;

  @ApiProperty()
  readonly autor: string;

  @ApiProperty()
  readonly resumen: string;

  @ApiProperty()
  readonly fotoPortada: string;

  @ApiProperty()
  readonly estado: string;

  @ApiProperty()
  readonly codigo: string;

  @ApiProperty()
  readonly cantidad: number;
}
