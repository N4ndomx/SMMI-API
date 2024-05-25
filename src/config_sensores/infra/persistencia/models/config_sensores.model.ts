import { HabitacionModel } from "src/habitaciones/infra/persistencia/models/habitaciones.model";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity("ConfigSensor")

export class ConfigSensorModel {
    @PrimaryGeneratedColumn()
    id: number
    @UpdateDateColumn()
    fecha_actualizacion: Date
    @Column('int')
    max_valor: number
    @Column('int')
    min_valor: number
    @Column('varchar')
    topico_sensor: string
    @ManyToOne(() => HabitacionModel,)
    habitacion: HabitacionModel;
}