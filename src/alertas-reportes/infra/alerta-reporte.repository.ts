import { Injectable } from "@nestjs/common";
import { IReporteAlertasRepository } from "../dominio/interface/alertas-reporte-repository.interface";
import { ReporteAlerta } from "../dominio/entities/alertas-reporte.entity";
import { ReporteAlertaMapper } from "../alerta-reporte.mapper";
import { InjectRepository } from "@nestjs/typeorm";
import { ReporteAlertaModel } from "./model/reporte-alerta.model";
import { Repository } from "typeorm";

@Injectable()
export class ReporteAlertasRepository implements IReporteAlertasRepository {
    constructor(
        @InjectRepository(ReporteAlertaModel)
        private readonly repository: Repository<ReporteAlertaModel>
    ) { }
    async findAllByIngreso(id_ingreos: string): Promise<ReporteAlerta[]> {
        const rest = await this.repository.find({
            where: {
                ingreso: { id_ingreso: id_ingreos },
            }
        })
        return rest ? rest.map((r) => ReporteAlertaMapper.toDomain(r)) : []
    }
    async findAllCompletosByIngreso(id_ingreos: string): Promise<ReporteAlerta[]> {
        const rest = await this.repository.find({
            where: {
                ingreso: { id_ingreso: id_ingreos },
                completado: true
            }
        })
        return rest ? rest.map((r) => ReporteAlertaMapper.toDomain(r)) : []
    }

    async findAllSinCompletarByIngreso(id_ingreos: string): Promise<ReporteAlerta[]> {
        const rest = await this.repository.find({
            where: {
                ingreso: { id_ingreso: id_ingreos },
                completado: false
            }
        })
        return rest ? rest.map((r) => ReporteAlertaMapper.toDomain(r)) : []
    }

    async save(modelodb: ReporteAlerta): Promise<ReporteAlerta> {
        const modebs = ReporteAlertaMapper.toPersistencia(modelodb)
        const res = await this.repository.save(modebs)
        return ReporteAlertaMapper.toDomain(res)
    }
    async findByOne(id: string): Promise<ReporteAlerta> {
        const res = await this.repository.findOneBy({ id_reporte: id })
        return res ? ReporteAlertaMapper.toDomain(res) : null
    }
    findAll(): Promise<ReporteAlerta[]> {
        throw new Error("Method not implemented.");
    }
    async update(id: string, modelodb: Partial<ReporteAlerta>): Promise<boolean> {
        await this.repository.update(id, modelodb)
        return true
    }
}