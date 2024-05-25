import { Between, EntityManager, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { SensorDataModel } from './models/sensor.model';
import { FindDataBySensorOptions, ISensorDataRepository } from 'src/sensores/domain/interface/sensores-interface';
import { SensorData } from 'src/sensores/domain/entities/sensore.entity';
import { SensorDataMapper } from 'src/sensores/sensor-data.mapper';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SensoresDataRepository implements ISensorDataRepository {
    constructor(
        @InjectRepository(SensorDataModel)
        private readonly repository: Repository<SensorDataModel>

    ) { }
    async findDataBySensor(options: FindDataBySensorOptions): Promise<SensorData[]> {
        const { id_habitacion, topico, fecha_init, fecha_end, hora_end, hora_init } = options;

        const query = this.repository
            .createQueryBuilder('datasensor')
            .innerJoinAndSelect('datasensor.habitacion', 'Habitaciones')
            .innerJoinAndSelect('datasensor.sensor', 'Catalogo_Sensores')
            .where("Habitaciones.id_habitacion = :idh", { idh: id_habitacion });

        if (topico != undefined) {
            query.andWhere("Catalogo_Sensores.topico = :t", { t: topico });
        }

        if (fecha_init && fecha_end) {
            query.andWhere("CAST(datasensor.fecha_registro as date) BETWEEN :init AND :end", { init: fecha_init, end: fecha_end });
        }

        if (hora_init && hora_end) {
            query.andWhere(`TO_CHAR(datasensor.fecha_registro AT TIME ZONE 'UTC', 'HH24:MI:SS') >= :initT`, { initT: hora_init })
                .andWhere(`TO_CHAR(datasensor.fecha_registro AT TIME ZONE 'UTC', 'HH24:MI:SS') <= :endT`, { endT: hora_end })
        }

        const res = await query.getMany();
        // console.log(res)
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
