import { CatalogoSensor } from "./domain/entities/catalogo-sensor.entity";
import { CatalogoSensoresModel } from "./infra/persistencia/models/catalogo-sensores.model";

export class CatalogoSensorMapper {
    static toDomain(model: CatalogoSensoresModel): CatalogoSensor {
        const domain: CatalogoSensor = {
            id: model.id,
            nombre: model.nombre_sensor,
            topico: model.topico,
            unidad_medida: model.unidad_medida
        };
        return domain;
    }

    static toPersistencia(domain: CatalogoSensor): CatalogoSensoresModel {
        const model = new CatalogoSensoresModel();
        model.id = domain.id;
        model.topico = domain.topico
        model.nombre_sensor = domain.nombre;
        model.unidad_medida = domain.unidad_medida
        return model;
    }
}
