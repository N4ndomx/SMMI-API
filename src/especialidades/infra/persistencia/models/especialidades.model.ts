import { MedicoModel } from 'src/medicos/infra/persistencia/models/medico.model';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Catalogo_Especialidades')
export class EspecialidadModel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 50, unique: true })
  nombre_especialidad: string;

  @Column('varchar', { length: 200, nullable: false })
  descipcion: string;

  @ManyToMany(
    () => MedicoModel,
    medico => medico.especialidades,
    {
      onDelete: "NO ACTION", onUpdate: "NO ACTION"
    })
  medicos: MedicoModel[]

}
