import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class AdministradorDto {
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly id: number;

  
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly correo: string;

}

export class CreateAdministradorDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    nombre: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    correo: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    clave: string;

  


}

export class loginDto {

    @IsString()
    @Expose()
    @IsNotEmpty()
    readonly nombre: string;

    @IsEmail()
    @Expose()
    @ApiProperty()
    readonly correo: string;
  
    @IsString()
    @Expose()
    @ApiProperty()
    readonly clave: string;
}
  