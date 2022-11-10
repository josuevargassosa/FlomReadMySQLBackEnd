import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity('Libro')
export class Libro {

    @PrimaryGeneratedColumn({name: 'Id'})
    id: number

    @Column({name: 'Nombre'})
    nombre: string

    @Column({name: 'Autor'})
    autor: string

    @Column({name: 'Resumen'})
    resumen: string

    @Column({name: 'FotoPortada'})
    fotoPortada: string


    @Column({name: 'Estado'})
    estado: string


    @Column({ name: 'FechaCreacion'})
    fechaCreacion: Date = new Date()


    @UpdateDateColumn({name: 'FechaModificacion'})
    fechaModificacion: Date = new Date();

    @Column({name: 'Codigo'})
    codigo: string

    @Column({name: 'Cantidad'})
    cantidad: number


}
