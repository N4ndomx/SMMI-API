import { DataSource, Repository } from 'typeorm';
import { MedicoModel } from './models/medico.model';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMapper, IMapperToken } from 'src/shared/interfaces/mapper.interface';
import { IMedicoRepository } from '../../domain/interfaces/medico-repository.interface';
import { Medico } from 'src/medicos/domain/entities/medico.entity';

@Injectable()
export class MedicoRepository implements IMedicoRepository {
    constructor(
        @InjectRepository(MedicoModel)
        private readonly _medicoRepo: Repository<MedicoModel>,
        @Inject(IMapperToken)
        private readonly mapperMedico: IMapper<Medico, MedicoModel>
    ) { }
    async findByCURP(curp: string): Promise<Medico> {
        const product = await this._medicoRepo.findOne({
            relations: { empleado: true },
            where: {
                empleado: { curp: curp },
            },
        });

        return product ? this.mapperMedico.toDomain(product) : null;
    }
    async findByOne(id: string): Promise<Medico> {
        const product = await this._medicoRepo.findOne({
            relations: { empleado: true },
            where: {
                matriculaMedico: id,
            },
        });

        return product ? this.mapperMedico.toDomain(product) : null;
    }

    async save(modelodb: Medico): Promise<Medico> {

        const dbr = await this._medicoRepo.save(
            this.mapperMedico.toPersistencia(modelodb));
        return dbr ? this.mapperMedico.toDomain(dbr) : null;
    }

    async findAll(): Promise<Medico[]> {
        const dbr = await this._medicoRepo.find()
        return dbr.map((dbm) => this.mapperMedico.toDomain(dbm))
    }
    update(id: string, item: Medico): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}
