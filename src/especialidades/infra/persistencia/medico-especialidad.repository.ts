import { Repository } from "typeorm";
import { Medico_Especialidad_Model } from "./models/medico-especialidad.model";
import { InjectRepository } from "@nestjs/typeorm";
import { ITransactionRunner } from "src/shared/interfaces/TransactionFactory/transactions.interface";
import { Injectable } from "@nestjs/common";
@Injectable()
export class MedicoEspecialidadRepository {
    constructor(
        @InjectRepository(Medico_Especialidad_Model)
        private readonly repository: Repository<Medico_Especialidad_Model>
    ) { }

    async save(matricula_medico: string, especialidad_id: number, transactionRunner?: ITransactionRunner): Promise<boolean> {
        const opcions: any = {
            matricula_medico: matricula_medico,
            especialidad_id: especialidad_id
        }
        const res = transactionRunner ?
            await transactionRunner.transactionManager.save(Medico_Especialidad_Model, opcions) :
            await this.repository.save(opcions)
        return res ? true : false;

    }
}