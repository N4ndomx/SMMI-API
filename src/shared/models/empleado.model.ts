import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Empleados')
export class EmpleadoModel {
  @Column('uuid', { primary: true, unique: true })
  id: string;

  @Column('varchar', { length: 50 })
  nombres: string;

  @Column('varchar', { length: 50 })
  apellidos: string;

  @Column('varchar', { length: 255 })
  direccion: string;

  @Column('varchar', { length: 12 })
  telefono: string;

  @Column('varchar', { length: 20, unique: true })
  curp: string;
  @Column('char', { nullable: true })
  genero: string;

  @Column("text")
  url_image: string
}
