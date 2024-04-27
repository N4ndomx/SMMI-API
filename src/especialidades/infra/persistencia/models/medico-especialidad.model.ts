import { MedicoModel } from "src/medicos/infra/persistencia/models/medico.model";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { EspecialidadModel } from "./especialidades.model";

@Entity("Medico_Especialidad")
export class Medico_Especialidad_Model {

    @PrimaryColumn({ name: 'matricula_medico', nullable: false })
    matricula_medico: string;

    @PrimaryColumn({ name: 'especialidad_id', nullable: false })
    especialidad_id: number;


    @ManyToOne(
        () => MedicoModel,
        medico => medico.especialidades,
        { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
    )
    @JoinColumn([{ name: 'matricula_medico', referencedColumnName: 'matriculaMedico' }])
    medicos: MedicoModel[];

    @ManyToOne(
        () => EspecialidadModel,
        espe => espe.medico_especialidad,
        { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
    )
    @JoinColumn([{ name: 'especialidad_id', referencedColumnName: 'id' }])
    especialidad: EspecialidadModel[];
}