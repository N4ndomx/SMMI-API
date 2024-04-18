import { IMapper } from 'src/shared/interfaces/mapper.interface';
import { Injectable } from '@nestjs/common';
import { Especialidad } from './domain/entities/especialidade.entity';
import { EspecialidadModel } from './infra/persistencia/models/especialidades.model';
@Injectable()
export class EspecialidadMapper {
  static toPersistencia(entity: Especialidad): EspecialidadModel {
    let model = new EspecialidadModel();
    model.nombre_especialidad = entity.nombre;
    model.descipcion = entity.descripcion;
    return model;
  }
  static toDomain(dbModel: EspecialidadModel): Especialidad {
    let domain = new Especialidad(
      dbModel.nombre_especialidad,
      dbModel.descipcion,
      dbModel.id,
    );
    return domain;
  }
}
