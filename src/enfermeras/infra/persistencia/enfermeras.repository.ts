import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ITransactionRunner } from 'src/shared/interfaces/TransactionFactory/transactions.interface';
import { IEnfermeraRepository } from 'src/enfermeras/domain/interface/enfermera-repository.interface';
import { EnfermeraModel } from './models/enfermera.model';
import { Enfermera } from 'src/enfermeras/domain/entities/enfermera.entity';
import { EnfermeraMapper } from 'src/enfermeras/enfermera.mapper';

@Injectable()
export class EnfermeraRepository implements IEnfermeraRepository {
    constructor(
        @InjectRepository(EnfermeraModel)
        private readonly repository: Repository<EnfermeraModel>,

    ) { }
    async findByCURP(curp: string, transactionRunner?: ITransactionRunner): Promise<Enfermera> {
        console.log(curp)
        const queryOptions: any = {
            relations: ['empleado'],
            where: {
                empleado: { curp: curp },
            },
        };
        const product = transactionRunner
            ? await transactionRunner.transactionManager.findOne(EnfermeraModel, queryOptions)
            : await this.repository.findOne(queryOptions)

        return product ? EnfermeraMapper.toDomain(product) : null;
    }
    async save(modelodb: Enfermera, transactionRunner?: ITransactionRunner): Promise<Enfermera> {
        const dbr = transactionRunner
            ? await transactionRunner.transactionManager.save(EnfermeraModel, EnfermeraMapper.toPersistencia(modelodb))
            : await this.repository.save(EnfermeraMapper.toPersistencia(modelodb));

        return dbr ? EnfermeraMapper.toDomain(dbr) : null;
    }

    async findByOne(id: string, transactionRunner?: ITransactionRunner): Promise<Enfermera> {

        const queryOptions: any = {
            relations: ['empleado',],
            where: {
                matriculaEnfermera: id,
            },
        };

        const product = transactionRunner
            ? await transactionRunner.transactionManager.findOne(EnfermeraModel, queryOptions)
            : await this.repository.findOne(queryOptions);

        return product ? EnfermeraMapper.toDomain(product) : null;
    }

    async findAll(transactionRunner?: ITransactionRunner): Promise<Enfermera[]> {
        const dbr = transactionRunner
            ? await transactionRunner.transactionManager.find(EnfermeraModel)
            : await this.repository.find();
        return dbr.map((dbm) => EnfermeraMapper.toDomain(dbm));
    }
    async update(id: string, modelodb: Enfermera, transactionRunner?: ITransactionRunner): Promise<boolean> {
        throw new Error('Method not implemented.');
    }



}
