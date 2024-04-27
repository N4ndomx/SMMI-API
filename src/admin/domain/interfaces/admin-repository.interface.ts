import { IRepositoryTransactional } from "src/shared/interfaces/repository-transactional.interface";
import { ITransactionRunner } from "src/shared/interfaces/TransactionFactory/transactions.interface";
import { Admin } from "../entities/admin.entity";

export const IAdminRepositoryToken = Symbol('IAdminRepository');
export interface IAdminRepository extends IRepositoryTransactional<Admin, string, ITransactionRunner> {
    findByCURP(curp: string, TransactionRunner?: ITransactionRunner): Promise<Admin>;

}
