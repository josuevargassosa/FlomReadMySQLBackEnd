import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Lector } from "src/lector/entities/lector.entity";
import { Libro } from "src/libro/entities/libro.entity";

export class EstadisticaLibroDto {

    @Expose()
    @ApiProperty()
    readonly libro: Libro[];

}

export class EstadisticaLectorDto {

    @Expose()
    @ApiProperty()
    readonly lector: Lector[];

}

// export class UpdateEstadisticaDto extends PartialType(CreateEstadisticaDto) {}
