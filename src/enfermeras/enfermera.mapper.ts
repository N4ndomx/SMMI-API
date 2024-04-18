import { EmpleadoModel } from "src/shared/models/empleado.model";
import { Enfermera } from "./domain/entities/enfermera.entity";
import { EnfermeraModel } from "./infra/persistencia/models/enfermera.model";

export class EnfermeraMapper {
    static toDomain(dbModel: EnfermeraModel): Enfermera {
        const medico = new Enfermera(
            dbModel.empleado.nombres,
            dbModel.empleado.apellidos,
            dbModel.empleado.direccion,
            dbModel.empleado.telefono,
            dbModel.empleado.curp,
            dbModel.empleado.genero,
            dbModel.cedula,
            dbModel.contrasena,
            dbModel.empleado.url_image,
            dbModel.habilidades_tecnicas,
            dbModel.empleado.id,
            dbModel.matriculaEnfermera,
        );
        return medico;
    }

    static toPersistencia(domain: Enfermera): EnfermeraModel {
        const empleado = new EmpleadoModel();
        empleado.id = domain.id;
        empleado.nombres = domain.nombres;
        empleado.apellidos = domain.apellidos;
        empleado.direccion = domain.direccion;
        empleado.telefono = domain.telefono;
        empleado.curp = domain.curp;
        empleado.genero = domain.genero;
        empleado.url_image = domain.url_img

        const model = new EnfermeraModel();
        model.matriculaEnfermera = domain.matricula;
        model.cedula = domain.cedula;
        model.contrasena = domain.contrasena;
        model.habilidades_tecnicas = domain.habilidades_tecnicas
        model.empleado = empleado;
        // medicoModel.especialidades = domain.especialidades.map(dominio => EspecialidadMapper.toPersistencia(dominio))


        return model;
    }
}
