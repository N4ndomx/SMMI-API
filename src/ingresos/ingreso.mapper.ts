import { EspecialidadMapper } from "src/especialidades/especialidad.mapper";
import { Ingreso } from "./domain/entities/ingreso.entity";
import { IngresoModel } from "./infra/models/ingreso.model";
import { HabitacionMapper } from "src/habitaciones/habitaciones.mapper";
import { EnfermeraMapper } from "src/enfermeras/enfermera.mapper";


export class IngresoMapper {
    static toDomain(dbModel: IngresoModel): Ingreso {
        const ingreso = new Ingreso(
            dbModel.nombres,
            dbModel.apellidos,
            dbModel.sexo,
            dbModel.edad,
            dbModel.padecimientos,
            dbModel.alergias,
            dbModel.causa_ingreso,
            EspecialidadMapper.toDomain(dbModel.id_especialidad),
            HabitacionMapper.toDomain(dbModel.habitacion),
            dbModel.id_ingreso,
            dbModel.fecha_actualizacion,
            dbModel.fecha_ingreso,
            dbModel.hora_ingreso,

        );

        // ingreso.fecha_ingreso = dbModel.fecha_ingreso;
        // ingreso.hora_ingreso = dbModel.hora_ingreso;
        ingreso.de_alta = dbModel.de_alta;

        if (dbModel.id_enfermera) {
            ingreso.asignarEnfermera(EnfermeraMapper.toDomain(dbModel.id_enfermera));
        }

        return ingreso;
    }

    static toPersistencia(domain: Ingreso): IngresoModel {
        const model = new IngresoModel();
        model.id_ingreso = domain.id_ingreso;
        model.fecha_ingreso = domain.fecha_ingreso;
        model.hora_ingreso = domain.hora_ingreso;
        model.nombres = domain.nombres;
        model.apellidos = domain.apellidos;
        model.sexo = domain.sexo;
        model.edad = domain.edad;
        model.padecimientos = domain.padecimientos;
        model.alergias = domain.alergias;
        model.causa_ingreso = domain.causa_ingreso;
        model.de_alta = domain.de_alta;
        model.fecha_actualizacion = domain.fecha_actualizacion;


        model.id_enfermera = EnfermeraMapper.toPersistencia(domain.id_enfermera);



        model.id_especialidad = EspecialidadMapper.toPersistencia(domain.id_especialidad);



        model.habitacion = HabitacionMapper.toPersistencia(domain.id_habitacion);


        return model;
    }
}
