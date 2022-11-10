import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity('Administrador')
export class Administrador {

    @PrimaryGeneratedColumn({name: 'Id'})
    id: number

    @Column({name: 'Nombre'})
    nombre: string

    @Column({name: 'Correo'})
    correo: string

    @Column({name: 'Clave'})
    clave: string

    @Column({ name: 'FechaCreacion'})
    fechaCreacion: Date = new Date()

    @UpdateDateColumn({name: 'FechaModificacion'})
    fechaModificacion: Date = new Date();
}
