import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('Lector')
export class Lector {

    @PrimaryGeneratedColumn({name: 'Id'})
    id: number

    @Column({name: 'Nombres'})
    nombres: string

    @Column({name: 'Apellidos'})
    apellidos: string

    @Column({name: 'Identificacion'})
    identificacion: string

    @Column({name: 'Edad'})
    edad: number

    @Column({name: 'Correo'})
    correo: string

    @Column({name: 'Grado'})
    grado: string

    @Column({name: 'FotoPerfil'})
    fotoPerfil: string

    @Column({name: 'Estado'})
    estado: string

    @Column({ name: 'FechaCreacion'})
    fechaCreacion: Date = new Date()


    @UpdateDateColumn({name: 'FechaModificacion'})
    fechaModificacion: Date = new Date();

    @Column({name: 'Clave'})
    clave: string

    @Column({name: 'Sexo'})
    sexo: string

    @Column({name: 'Institucion'})
    institucion: string

}
