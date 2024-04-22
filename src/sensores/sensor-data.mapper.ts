import { DateValue } from "src/shared/VO/fecha.vo";
import { CatalogoSensorMapper } from "./catalogo-sensor.mapper";
import { SensorData } from "./domain/entities/sensore.entity";
import { SensorDataModel } from "./infra/persistencia/models/sensor.model";

export class SensorDataMapper {
    static toDomain(model: SensorDataModel): SensorData {
        const domain: SensorData = {
            id: model.id,
            fecha_registro: new DateValue(model.fecha_registro),
            valor_registrado: model.valor_registrado,
            sensor: CatalogoSensorMapper.toDomain(model.topico_sensor)
        };
        return domain;
    }

    static toPersistencia(domain: SensorData): SensorDataModel {
        const model = new SensorDataModel();
        model.id = domain.id;
        model.fecha_registro = domain.fecha_registro.value;
        model.valor_registrado = domain.valor_registrado;
        model.topico_sensor = CatalogoSensorMapper.toPersistencia(domain.sensor)
        return model;
    }
}
