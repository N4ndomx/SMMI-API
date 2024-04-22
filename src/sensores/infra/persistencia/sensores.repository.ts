import { EntityManager, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { SensorDataModel } from './models/sensor.model';
import { ISensorDataRepository } from 'src/sensores/domain/interface/sensores-interface';
import { SensorData } from 'src/sensores/domain/entities/sensore.entity';
import { SensorDataMapper } from 'src/sensores/sensor-data.mapper';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SensoresDataRepository implements ISensorDataRepository {
    constructor(
        @InjectRepository(SensorDataModel)
        private readonly repository: Repository<SensorDataModel>

    ) { }
    async save(modelodb: SensorData): Promise<SensorData> {
        const db = SensorDataMapper.toPersistencia(modelodb)
        const res = await this.repository.save(db)
        return res ? SensorDataMapper.toDomain(res) : null
    }
    async findByOne(id: number): Promise<SensorData> {
        const res = await this.repository.findOneBy({ id: id })
        return res ? SensorDataMapper.toDomain(res) : null
    }
    findAll(): Promise<SensorData[]> {
        throw new Error('Method not implemented.');
    }
    update(id: string, modelodb: SensorData): Promise<boolean> {
        throw new Error('Method not implemented.');
    }



}
