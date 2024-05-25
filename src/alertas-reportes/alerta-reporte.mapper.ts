import { IngresoMapper } from "src/ingresos/ingreso.mapper";
import { ReporteAlerta } from "./dominio/entities/alertas-reporte.entity";
import { ReporteAlertaModel } from "./infra/model/reporte-alerta.model";

export class ReporteAlertaMapper {
    static toDomain(dbModel: ReporteAlertaModel): ReporteAlerta {
        const reporteAlerta = new ReporteAlerta(
        );
        reporteAlerta.id_reporte = dbModel.id_reporte
        reporteAlerta.duracion_emergencia_sg = dbModel.duracion_emergencia_sg
        reporteAlerta.fecha_registro = dbModel.fecha_registro
        reporteAlerta.sensores_reporte = dbModel.sensores_reporte
        reporteAlerta.evento_critico = dbModel.evento_critico ?? ""
        reporteAlerta.acciones_tomadas = dbModel.acciones_tomadas ?? ""
        reporteAlerta.completado = dbModel.completado
        reporteAlerta.Ingreso = dbModel.ingreso ? IngresoMapper.toDomain(dbModel.ingreso) : undefined

        return reporteAlerta;
    }

    static toPersistencia(domain: ReporteAlerta): ReporteAlertaModel {
        const model = new ReporteAlertaModel();
        model.id_reporte = domain.id_reporte;
        model.duracion_emergencia_sg = domain.duracion_emergencia_sg;
        model.fecha_registro = domain.fecha_registro;
        model.sensores_reporte = domain.sensores_reporte;
        model.evento_critico = domain.evento_critico;
        model.acciones_tomadas = domain.acciones_tomadas;
        model.completado = domain.completado
        model.ingreso = IngresoMapper.toPersistencia(domain.Ingreso);

        return model;
    }
}
