import { EspecialidadModel } from 'src/especialidades/infra/persistencia/models/especialidades.model';
import { Medico_Especialidad_Model } from 'src/especialidades/infra/persistencia/models/medico-especialidad.model';
import { EmpleadoModel } from 'src/shared/models/empleado.model';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @OneToMany(() => Medico_Especialidad_Model,
    (model) => model.medicos,
    {
      eager: true,
      onDelete: "NO ACTION", onUpdate: "NO ACTION"
    }
  )
  especialidades: Medico_Especialidad_Model[]
}
