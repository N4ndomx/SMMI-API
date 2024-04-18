import { IRepository } from 'src/shared/interfaces/repository.interface';
import { Medico } from 'src/medicos/domain/entities/medico.entity';
import { ITransactionRunner } from 'src/shared/interfaces/TransactionFactory/transactions.interface';
export const IMedicoRepositoryToken = Symbol('IMedicoRepository');
export interface IMedicoRepository extends IRepository<Medico, string, ITransactionRunner> {
  findByCURP(curp: string, TransactionRunner?: ITransactionRunner): Promise<Medico>;
}
