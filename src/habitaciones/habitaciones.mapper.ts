import { Habitacion } from "./domain/entities/habitacione.entity";
import { HabitacionModel } from "./infra/persistencia/models/habitaciones.model";

export class HabitacionMapper {
    static toDomain(model: HabitacionModel): Habitacion {
        const domain = new Habitacion()
        domain.id_habitacion = model.id_habitacion
        domain.nombre_habitacion = model.nombre_habitacion
        domain.ocupado = model.ocupado

        return domain;
    }

    static toPersistencia(domain: Habitacion): HabitacionModel {
        const model = new HabitacionModel();
        model.id_habitacion = domain.id_habitacion;
        model.nombre_habitacion = domain.nombre_habitacion;
        model.ocupado = domain.ocupado
        return model;
    }
}
