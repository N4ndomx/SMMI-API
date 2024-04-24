import { IRepositoryTransactional } from "src/shared/interfaces/repository-transactional.interface";
import { Enfermera } from "../entities/enfermera.entity";
import { ITransactionRunner } from "src/shared/interfaces/TransactionFactory/transactions.interface";

export const IEnfermeraRepositoryToken = Symbol('IEnfermeraRepository');
export interface IEnfermeraRepository extends IRepositoryTransactional<Enfermera, string, ITransactionRunner> {
    findByCURP(curp: string, TransactionRunner?: ITransactionRunner): Promise<Enfermera>;

}
