import { IngresoMapper } from "src/ingresos/ingreso.mapper";
import { Receta } from "./dominio/entities/receta.entity";
import { RecetaModel } from "./infra/model/receta.model";
import { MedicoMapper } from "src/medicos/medicos.mapper";


export class RecetaMapper {
    static toDomain(dbModel: RecetaModel): Receta {
        const receta = new Receta(
            dbModel.medicamentos,
            dbModel.indicaciones_addic,
            MedicoMapper.toDomain(dbModel.medico),
            IngresoMapper.toDomain(dbModel.ingreso)
        );
        receta.id_receta = dbModel.id_receta;
        receta.fecha_registro = dbModel.fecha_registro;
        return receta;
    }

    static toPersistencia(domain: Receta): RecetaModel {
        const model = new RecetaModel();
        model.id_receta = domain.id_receta;
        model.medicamentos = domain.medicamentos;
        model.indicaciones_addic = domain.indicaciones_addic;
        model.fecha_registro = domain.fecha_registro;
        model.medico = MedicoMapper.toPersistencia(domain.medico);
        model.ingreso = IngresoMapper.toPersistencia(domain.ingreso);
        return model;
    }
}
