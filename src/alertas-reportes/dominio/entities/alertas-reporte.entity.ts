import { Ingreso } from "src/ingresos/domain/entities/ingreso.entity";
export class ReporteAlerta {
    id_reporte: string
    duracion_emergencia_sg: number
    fecha_registro: Date
    sensores_reporte: string
    evento_critico?: string
    acciones_tomadas?: string
    Ingreso: Ingreso
    completado: boolean

}
