import { Medico } from './domain/entities/medico.entity';
import { MedicoModel } from './infra/persistencia/models/medico.model';
import { EmpleadoModel } from 'src/shared/models/empleado.model';
import { Injectable } from '@nestjs/common';
import { EspecialidadMapper } from 'src/especialidades/especialidad.mapper';
@Injectable()
export class MedicoMapper {
  static toDomain(dbModel: MedicoModel): Medico {
    const especialidad = dbModel.especialidades ? dbModel.especialidades.map((modeljoin) => modeljoin.especialidad).flat() : []
    const domainEsp = especialidad.map((model) => EspecialidadMapper.toDomain(model))
    const medico = new Medico(
      dbModel.empleado.nombres,
      dbModel.empleado.apellidos,
      dbModel.empleado.direccion,
      dbModel.empleado.telefono,
      dbModel.empleado.curp,
      dbModel.cedula,
      dbModel.contrasena,
      dbModel.empleado.genero,
      dbModel.empleado.url_image,
      dbModel.matriculaMedico,
      dbModel.empleado.id,
      domainEsp
    );
    return medico;
  }

  static toPersistencia(domain: Medico): MedicoModel {
    const empleado = new EmpleadoModel();
    empleado.id = domain.id;
    empleado.nombres = domain.nombres;
    empleado.apellidos = domain.apellidos;
    empleado.direccion = domain.direccion;
    empleado.telefono = domain.telefono;
    empleado.curp = domain.curp;
    empleado.genero = domain.genero;
    empleado.url_image = domain.url_img

    const medicoModel = new MedicoModel();
    medicoModel.matriculaMedico = domain.matriculaMedico;
    medicoModel.cedula = domain.cedula;
    medicoModel.contrasena = domain.contrasena;
    medicoModel.empleado = empleado;
    // medicoModel.especialidades = domain.especialidades.map(dominio => EspecialidadMapper.toPersistencia(dominio))


    return medicoModel;
  }
}
