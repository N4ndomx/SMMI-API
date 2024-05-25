import { DateValue } from "src/shared/VO/fecha.vo";
import { CatalogoSensorMapper } from "./catalogo-sensor.mapper";
import { SensorData } from "./domain/entities/sensore.entity";
import { SensorDataModel } from "./infra/persistencia/models/sensor.model";
import { HabitacionMapper } from "src/habitaciones/habitaciones.mapper";

export class SensorDataMapper {
    static toDomain(model: SensorDataModel): SensorData {
        const domain: SensorData = {
            id: model.id,
            fecha_registro: new DateValue(new Date(model.fecha_registro)),
            valor_registrado: model.valor_registrado,
            sensor: model.sensor ? CatalogoSensorMapper.toDomain(model.sensor) : null,
            habitacion: HabitacionMapper.toDomain(model.habitacion)
        };
        return domain;
    }

    static toPersistencia(domain: SensorData): SensorDataModel {
        const model = new SensorDataModel();
        model.id = domain.id;
        model.fecha_registro = domain.fecha_registro.value.toISOString();
        model.valor_registrado = domain.valor_registrado;
        model.sensor = CatalogoSensorMapper.toPersistencia(domain.sensor)
        model.habitacion = HabitacionMapper.toPersistencia(domain.habitacion)
        return model;
    }
}
