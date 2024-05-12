import { Ingreso } from "src/ingresos/domain/entities/ingreso.entity";
import { IngresoModel } from "src/ingresos/infra/models/ingreso.model";
import { MedicoModel } from "src/medicos/infra/persistencia/models/medico.model";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Receta')
export class RecetaModel {
    @PrimaryGeneratedColumn('uuid')
    id_receta: string
    @Column('text')
    medicamentos: string
    @Column('text')
    indicaciones_addic: string
    @CreateDateColumn()
    fecha_registro: Date

    @ManyToOne(() => MedicoModel, { eager: true })
    medico: MedicoModel

    @ManyToOne(() => IngresoModel, { eager: true })
    ingreso: IngresoModel
}