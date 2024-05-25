import { IngresoModel } from "src/ingresos/infra/models/ingreso.model";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity("ReporteAlerta")
export class ReporteAlertaModel {
    @PrimaryGeneratedColumn('uuid')
    id_reporte: string
    @Column('float', { comment: "duracion de emergencia en segundos" })
    duracion_emergencia_sg: number
    @CreateDateColumn({ type: 'timestamptz' })
    fecha_registro: Date
    @Column('json')
    sensores_reporte: string
    @Column('text', { nullable: true })
    evento_critico: string
    @Column('text', { nullable: true })
    acciones_tomadas: string
    @Column('bool', { default: false })
    completado: boolean
    @ManyToOne(() => IngresoModel)
    @JoinColumn({ name: "id_ingreso" })
    ingreso: IngresoModel
}