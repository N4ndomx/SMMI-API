import { IRepositoryTransactional } from 'src/shared/interfaces/repository-transactional.interface';
import { Especialidad } from '../entities/especialidade.entity';
import { ITransactionRunner } from 'src/shared/interfaces/TransactionFactory/transactions.interface';
export const IEspecialidadRepositoryToken = Symbol('IEspecialidadRepository');
export interface IEspecialidadRepository
    extends IRepositoryTransactional<Especialidad, number, ITransactionRunner> { }
