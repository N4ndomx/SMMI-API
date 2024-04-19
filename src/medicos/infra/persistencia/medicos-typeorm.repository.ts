import { EntityManager, Repository } from 'typeorm';
import { MedicoModel } from './models/medico.model';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMapper, IMapperToken } from 'src/shared/interfaces/mapper.interface';
import { IMedicoRepository } from '../../domain/interfaces/medico-repository.interface';
import { Medico } from 'src/medicos/domain/entities/medico.entity';
import { ITransactionRunner } from 'src/shared/interfaces/TransactionFactory/transactions.interface';
import { MedicoMapper } from 'src/medicos/medicos.mapper';

@Injectable()
export class MedicoRepository implements IMedicoRepository {
  constructor(
    @InjectRepository(MedicoModel)
    private readonly repository: Repository<MedicoModel>,

  ) { }
  async findByCURP(curp: string, transactionRunner?: ITransactionRunner): Promise<Medico> {
    const queryOptions: any = {
      relations: ['empleado'],
      where: {
        empleado: { curp: curp },
      },
    };

    const product = transactionRunner
      ? await this.repository.findOne(queryOptions)
      : await transactionRunner.transactionManager.findOne(MedicoModel, queryOptions);

    return product ? MedicoMapper.toDomain(product) : null;
  }
  async save(modelodb: Medico, transactionRunner?: ITransactionRunner): Promise<Medico> {
    const dbr = transactionRunner
      ? await transactionRunner.transactionManager.save(MedicoMapper.toPersistencia(modelodb))
      : await this.repository.save(MedicoMapper.toPersistencia(modelodb));

    return dbr ? MedicoMapper.toDomain(dbr) : null;
  }

  async findByOne(id: string, transactionRunner?: ITransactionRunner): Promise<Medico> {

    const queryOptions: any = {
      relations: ['empleado',],
      where: {
        matriculaMedico: id,
      },
    };

    const product = transactionRunner
      ? await transactionRunner.transactionManager.findOne(MedicoModel, queryOptions)
      : await this.repository.findOne(queryOptions);

    return product ? MedicoMapper.toDomain(product) : null;
  }

  async findAll(transactionRunner?: ITransactionRunner): Promise<Medico[]> {
    const dbr = transactionRunner
      ? await transactionRunner.transactionManager.find(MedicoModel)
      : await this.repository.find();

    return dbr.map((dbm) => MedicoMapper.toDomain(dbm));
  }
  async update(id: string, modelodb: Medico, transactionRunner?: ITransactionRunner): Promise<boolean> {
    throw new Error('Method not implemented.');
  }



}
