import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';


@Exclude()
export class LibroLectorDto {
    @Expose()
    @ApiProperty()
    readonly id: number;

    @Expose()
    @ApiProperty()
    readonly lector: string;

    @Expose()
    @ApiProperty()
    readonly libro: string;

    @Expose()
    @ApiProperty()
    readonly estado: string;

    @Expose()
    @ApiProperty()
    readonly tiempo: Date;

    @Expose()
    @ApiProperty()
    readonly fechaCreacion: Date;

    @Expose()
    @ApiProperty()
    readonly fechaModificacion: Date;
}

export class prestamosLectorDto {
    @Expose()
    @ApiProperty()
    readonly id: number;

    @Expose()
    @ApiProperty()
    readonly idLector: string;

    @Expose()
    @ApiProperty()
    readonly idLibro: string;

    @Expose()
    @ApiProperty()
    readonly estado: string;
}

export class CreateLibroLectorDto {

    @IsNumber()
    @Expose()
    @ApiProperty({ description: `Id del libro` })
    readonly idLibro: number;

    @IsNumber()
    @Expose()
    @ApiProperty()
    readonly idLector: number;

    @IsString()
    @Expose()
    @ApiProperty()
    readonly estado: string;
}




export class UpdateLibroLectorDto extends PartialType(CreateLibroLectorDto) {}
