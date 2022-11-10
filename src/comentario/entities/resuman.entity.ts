import { Lector } from "src/lector/entities/lector.entity";
import { Libro } from "src/libro/entities/libro.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity()
export class Comentario {

    @PrimaryGeneratedColumn({name: 'Id'})
    id: number

    @Column({name: 'Descripcion'})
    descripcion: string

    
    @Column({name: 'IdLibroLector'})
    idLibroLector: number

    @Column({name: 'IdLibro'})
    idLibro: number

    @Column({name: 'IdLector'})
    idLector: number


    @Column({ name: 'FechaCreacion'})
    fechaCreacion: Date = new Date()


    @UpdateDateColumn({name: 'FechaModificacion'})
    fechaModificacion: Date = new Date();

    //JOIN COLUMMN LIBRO
    @ManyToOne(() => Libro, (libro) => libro.id)
    @JoinColumn({name: 'IdLibro', referencedColumnName: 'id'})
    libro: Libro

    //JOIN COLUMMN LECTOR
    @ManyToOne(() => Lector, (lector) => lector.id)
    @JoinColumn({name: 'IdLector', referencedColumnName: 'id'})
    lector: Lector
}
