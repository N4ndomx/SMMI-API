import { IRepository } from "src/shared/interfaces/repository.interface";
import { ReporteAlerta } from "../entities/alertas-reporte.entity";

export const IReporteAlertasRepositoryToken = Symbol('IReporteAlertasRepository');
export interface IReporteAlertasRepository extends IRepository<ReporteAlerta, string> {
    findAllCompletosByIngreso(id_ingreos: string): Promise<ReporteAlerta[]>
    findAllSinCompletarByIngreso(id_ingreos: string): Promise<ReporteAlerta[]>
    findAllByIngreso(id_ingreos: string): Promise<ReporteAlerta[]>
}