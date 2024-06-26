import { DateValue } from "src/shared/VO/fecha.vo";
import { CatalogoSensor } from "./catalogo-sensor.entity";
import { Habitacion } from "src/habitaciones/domain/entities/habitacione.entity";

export class SensorData {
    id?: number;

    fecha_registro: DateValue;
    valor_registrado: number;
    sensor: CatalogoSensor;
    habitacion: Habitacion
}
