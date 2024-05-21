import { Between, EntityManager, Repository } from 'typeorm';
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
    async findDataBySensor(id_habitacion: number, topico: string, fecha_init?: string, fecha_end?: string): Promise<SensorData[]> {

        const res = await this.repository
            .createQueryBuilder('datasensor')
            .innerJoinAndSelect('datasensor.habitacion', 'Habitaciones')
            .innerJoinAndSelect('datasensor.sensor', 'Catalogo_Sensores')
            .where("Habitaciones.id_habitacion = :idh", { idh: id_habitacion })
            .andWhere("Catalogo_Sensores.topico = :t", { t: topico })
            // .andWhere("CAST(datasensor.fecha_registro as date) BETWEEN :init  AND :end", { init: fecha_init ?? null, end: fecha_end ?? null })
            .getMany();
        // console.log(ingresos)

        // const res = await this.repository.find(
        //     {

        //         where: {
        //             fecha_registro: Between(new Date(fecha_init).toISOString(), new Date(fecha_end).toISOString()),

        //             habitacion: { id_habitacion: id_habitacion }, sensor: { topico: topico }
        //         }
        //     })
        return res ? res.map((r) => SensorDataMapper.toDomain(r)) : null
    }
    async save(modelodb: SensorData): Promise<SensorData> {
        const db = SensorDataMapper.toPersistencia(modelodb)
        const res = await this.repository.save(db)
        return res ? SensorDataMapper.toDomain(res) : null
    }
    async findByOne(id: number): Promise<SensorData> {
        const res = await this.repository.findOneBy({ id: id })
        return res ? SensorDataMapper.toDomain(res) : null
    }
    async findAll(): Promise<SensorData[]> {
        const res = await this.repository.find()
        console.log(res)
        return res ? res.map((r) => SensorDataMapper.toDomain(r)) : null
    }
    update(id: number, modelodb: SensorData): Promise<boolean> {
        throw new Error('Method not implemented.');
    }



}
