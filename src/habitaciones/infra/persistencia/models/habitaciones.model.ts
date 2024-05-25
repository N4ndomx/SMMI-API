import { ConfigSensorModel } from "src/config_sensores/infra/persistencia/models/config_sensores.model";
import { SensorDataModel } from "src/sensores/infra/persistencia/models/sensor.model";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("Habitaciones")
export class HabitacionModel {
    @PrimaryGeneratedColumn('increment')
    id_habitacion: number
    @Column('varchar')
    nombre_habitacion: string
    @Column('boolean', { default: false })
    ocupado: boolean

    @OneToMany(() => SensorDataModel, (model) => model.sensor)
    dataSensor: SensorDataModel[]
    @OneToMany(() => ConfigSensorModel, (model) => model.habitacion, { cascade: true, eager: true })
    config_sensores: ConfigSensorModel[]
}
