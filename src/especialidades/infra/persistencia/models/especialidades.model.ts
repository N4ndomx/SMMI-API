import { MedicoModel } from 'src/medicos/infra/persistencia/models/medico.model';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Medico_Especialidad_Model } from './medico-especialidad.model';

@Entity('Catalogo_Especialidades')
export class EspecialidadModel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 50, unique: true })
  nombre_especialidad: string;

  @Column('varchar', { length: 200, nullable: false })
  descipcion: string;

  @OneToMany(
    () => Medico_Especialidad_Model,
    (model) => model.especialidad,
    {
      onDelete: "NO ACTION", onUpdate: "NO ACTION"
    })
  medico_especialidad: Medico_Especialidad_Model

}
