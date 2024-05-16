import { EntityManager, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { CatalogoSensoresModel } from './models/catalogo-sensores.model';
import { CatalogoSensorMapper } from 'src/sensores/catalogo-sensor.mapper';
import { ICatalogoSensorRepository } from 'src/sensores/domain/interface/catalogo-sensores-interface';
import { CatalogoSensor } from 'src/sensores/domain/entities/catalogo-sensor.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CatalogoSensoresRepository implements ICatalogoSensorRepository {
    constructor(

        @InjectRepository(CatalogoSensoresModel)
        private readonly repository: Repository<CatalogoSensoresModel>

    ) { }
    async findByTopico(topico: string): Promise<CatalogoSensor> {
        const res = await this.repository.findOneBy({ nombre_topico: topico })
        return res ? CatalogoSensorMapper.toDomain(res) : null
    }
    async save(modelodb: CatalogoSensor): Promise<CatalogoSensor> {
        const db = CatalogoSensorMapper.toPersistencia(modelodb)
        const res = await this.repository.save(db)
        return res ? CatalogoSensorMapper.toDomain(res) : null
    }
    async findByOne(id: number): Promise<CatalogoSensor> {
        const res = await this.repository.findOneBy({ id: id })
        return res ? CatalogoSensorMapper.toDomain(res) : null
    }
    async findAll(): Promise<CatalogoSensor[]> {
        const res = await this.repository.find()
        return res ? res.map((e) => CatalogoSensorMapper.toDomain(e)) : []
    }
    update(id: number, modelodb: CatalogoSensor): Promise<boolean> {
        throw new Error('Method not implemented.');
    }


}
