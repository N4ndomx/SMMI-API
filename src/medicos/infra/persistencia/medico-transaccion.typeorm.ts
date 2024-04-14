import { TransactionTypeorm } from "src/shared/helpers/transaction.abstract";
import { MedicoModel } from "./models/medico.model";
import { Medico } from "src/medicos/domain/entities/medico.entity";
import { DataSource } from "typeorm";
import { MedicoMapper } from "src/medicos/medicos.mapper";
import { Injectable } from "@nestjs/common";
@Injectable()

export class MedicoTransaccion extends TransactionTypeorm<MedicoModel, Medico, String> {
    constructor(
        private datasource: DataSource,
        private _map: MedicoMapper
    ) {
        super(datasource, _map);
    }
}