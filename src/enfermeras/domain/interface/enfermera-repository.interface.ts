import { IRepository } from "src/shared/interfaces/repository.interface";
import { Enfermera } from "../entities/enfermera.entity";
import { ITransactionRunner } from "src/shared/interfaces/TransactionFactory/transactions.interface";

export const IEnfermeraRepositoryToken = Symbol('IEnfermeraRepository');
export interface IEnfermeraRepository extends IRepository<Enfermera, string, ITransactionRunner> {
    findByCURP(curp: string, TransactionRunner?: ITransactionRunner): Promise<Enfermera>;

}
