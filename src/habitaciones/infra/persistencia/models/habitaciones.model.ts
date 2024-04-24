import { SensorDataModel } from "src/sensores/infra/persistencia/models/sensor.model";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("Habitaciones")
export class HabitacionModel {
    @PrimaryGeneratedColumn()
    id_habitacion: number
    @Column('varchar')
    nombre_habitacion: string
    @Column('boolean', { default: false })
    ocupado: boolean

    @OneToMany(() => SensorDataModel, (model) => model.topico_sensor)
    dataSensor: SensorDataModel[]
}
