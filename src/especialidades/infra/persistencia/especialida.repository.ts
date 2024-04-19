import { Especialidad } from 'src/especialidades/domain/entities/especialidade.entity';
import { EspecialidadModel } from './models/especialidades.model';
import { IEspecialidadRepository } from '../../domain/interfaces/especialidad-reposirory.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ITransactionRunner } from 'src/shared/interfaces/TransactionFactory/transactions.interface';
import { Repository } from 'typeorm';
import { EspecialidadMapper } from 'src/especialidades/especialidad.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EspecialidadRepository implements IEspecialidadRepository {
    constructor(
        @InjectRepository(EspecialidadModel)
        private readonly repository: Repository<EspecialidadModel>,

    ) { }
    async save(modelodb: Especialidad, transactionRunner?: ITransactionRunner): Promise<Especialidad> {
        const dbm = EspecialidadMapper.toPersistencia(modelodb);
        const res = transactionRunner ?
            await transactionRunner.transactionManager.save(dbm) :
            await this.repository.save(dbm)
        return res ? EspecialidadMapper.toDomain(res) : null;

    }
    async findByOne(id: number, transactionRunner?: ITransactionRunner): Promise<Especialidad> {
        const queryOptions: any = {
            where: { id: id },
        }
        const res = transactionRunner ?
            await transactionRunner.transactionManager.findOne(EspecialidadModel, queryOptions)
            : await this.repository.findOne(queryOptions);
        return res ? EspecialidadMapper.toDomain(res) : null;

    }
    async findAll(transactionRunner?: ITransactionRunner): Promise<Especialidad[]> {
        const res = transactionRunner
            ? await transactionRunner.transactionManager.find(EspecialidadModel) :
            await this.repository.find();
        return res ? res.map((espcialidadMd) => EspecialidadMapper.toDomain(espcialidadMd)) : null;

    }
    async update(id: string, modelodb: Especialidad, transactionRunner?: ITransactionRunner): Promise<boolean> {
        throw new Error('Method not implemented.');
    }


}
