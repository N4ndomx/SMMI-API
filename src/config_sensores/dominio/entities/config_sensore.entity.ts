import { Habitacion } from "src/habitaciones/domain/entities/habitacione.entity"

export class ConfigSensor {
    id?: number
    fecha_actualizacion?: Date
    max_valor: number
    min_valor: number
    topico_sensor: string
    ishabitacion?: Habitacion;
}
