import { EmpleadoModel } from "src/shared/models/empleado.model";
import { Admin } from "./domain/entities/admin.entity";
import { AdminModel } from "./infra/model/Admin.model";

export class AdminMapper {
    static toDomain(dbModel: AdminModel): Admin {
        const admin = new Admin(
            dbModel.empleado.nombres,
            dbModel.empleado.apellidos,
            dbModel.empleado.direccion,
            dbModel.empleado.telefono,
            dbModel.empleado.curp,
            dbModel.empleado.genero,
            dbModel.contrasena,
            dbModel.empleado.url_image,
            dbModel.nivel_educacion,
            dbModel.conocimiento_auxilios,
            dbModel.empleado.id,
            dbModel.matriculaAdmin
        );
        return admin;
    }

    static toPersistencia(domain: Admin): AdminModel {
        const empleado = new EmpleadoModel();
        empleado.id = domain.id;
        empleado.nombres = domain.nombres;
        empleado.apellidos = domain.apellidos;
        empleado.direccion = domain.direccion;
        empleado.telefono = domain.telefono;
        empleado.curp = domain.curp;
        empleado.genero = domain.genero;
        empleado.url_image = domain.url_img;

        const model = new AdminModel();
        model.matriculaAdmin = domain.matricula;
        model.contrasena = domain.contrasena;
        model.nivel_educacion = domain.nivel_educacion;
        model.conocimiento_auxilios = domain.conocimiento_auxilios;
        model.empleado = empleado;

        return model;
    }
}
