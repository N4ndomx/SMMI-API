import { IRepositoryTransactional } from 'src/shared/interfaces/repository-transactional.interface';
import { Medico } from 'src/medicos/domain/entities/medico.entity';
import { ITransactionRunner } from 'src/shared/interfaces/TransactionFactory/transactions.interface';
export const IMedicoRepositoryToken = Symbol('IMedicoRepository');
export interface IMedicoRepository extends IRepositoryTransactional<Medico, string, ITransactionRunner> {
  findByCURP(curp: string, TransactionRunner?: ITransactionRunner): Promise<Medico>;
}
