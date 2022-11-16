import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Administrador')
export class Administrador {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'Nombre' })
  nombre: string;

  @Column({ name: 'Correo' })
  correo: string;

  @Column({ name: 'Clave' })
  clave: string;

  @Exclude()
  @Column({
    name: 'FechaCreacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date = new Date();

  @Exclude()
  @UpdateDateColumn({ name: 'FechaModificacion' })
  fechaModificacion: Date = new Date();
}
