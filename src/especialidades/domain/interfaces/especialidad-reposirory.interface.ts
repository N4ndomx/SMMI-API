import { IRepository } from 'src/shared/interfaces/repository.interface';
import { Especialidad } from '../entities/especialidade.entity';
import { ITransactionRunner } from 'src/shared/interfaces/TransactionFactory/transactions.interface';
export const IEspecialidadRepositoryToken = Symbol('IEspecialidadRepository');
export interface IEspecialidadRepository
    extends IRepository<Especialidad, number, ITransactionRunner> { }
