import { EspecialidadModel } from 'src/especialidades/infra/persistencia/models/especialidades.model';
import { EmpleadoModel } from 'src/shared/models/empleado.model';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Medicos')
export class MedicoModel {
  @Column('varchar', { length: 7, primary: true, unique: true })
  matriculaMedico: string;

  @Column('varchar', { length: 18, unique: true })
  cedula: string;

  @Column('varchar')
  contrasena: string;

  @OneToOne(() => EmpleadoModel, { cascade: true, eager: true })
  @JoinColumn({ name: 'idEmpleado' })
  empleado: EmpleadoModel;

  @ManyToMany(() => EspecialidadModel)
  @JoinTable({ name: 'especialidad_medicos' })
  especialidades: EspecialidadModel[];
}
