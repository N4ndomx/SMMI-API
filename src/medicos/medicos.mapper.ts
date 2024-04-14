import { IMapper } from 'src/shared/interfaces/mapper.interface';
import { Medico } from './domain/entities/medico.entity';
import { MedicoModel } from './infra/persistencia/models/medico.model';
import { EmpleadoModel } from 'src/shared/models/empleado.model';
import { Injectable } from '@nestjs/common';
@Injectable()
export class MedicoMapper implements IMapper<Medico, MedicoModel> {
  toDomain(dbModel: MedicoModel): Medico {
    const medico = new Medico(
      dbModel.empleado.nombres,
      dbModel.empleado.apellidos,
      dbModel.empleado.direccion,
      dbModel.empleado.telefono,
      dbModel.empleado.curp,
      dbModel.cedula,
      dbModel.contrasena,
      dbModel.empleado.genero,
      dbModel.matriculaMedico,
      dbModel.empleado.id,
    );
    return medico;
  }

  toPersistencia(domain: Medico): MedicoModel {
    const empleado = new EmpleadoModel();
    empleado.id = domain.id;
    empleado.nombres = domain.nombres;
    empleado.apellidos = domain.apellidos;
    empleado.direccion = domain.direccion;
    empleado.telefono = domain.telefono;
    empleado.curp = domain.curp;
    empleado.genero = domain.genero;

    const medicoModel = new MedicoModel();
    medicoModel.matriculaMedico = domain.matriculaMedico;
    medicoModel.cedula = domain.cedula;
    medicoModel.contrasena = domain.contrasena;
    medicoModel.empleado = empleado;

    return medicoModel;
  }
}
