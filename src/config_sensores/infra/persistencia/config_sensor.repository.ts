import { Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigSensor } from "src/config_sensores/dominio/entities/config_sensore.entity";
import { IConfigSensorRepository } from "src/config_sensores/dominio/interface/config_sensor-repo.interface";
import { ConfigSensorModel } from "./models/config_sensores.model";
import { Repository } from "typeorm";
import { HabitacionMapper } from "src/habitaciones/habitaciones.mapper";

export class ConfigSensorRepository implements IConfigSensorRepository {
    constructor(
        @InjectRepository(ConfigSensorModel)
        private repository: Repository<ConfigSensorModel>
    ) { }
    findByHabitacion(id_habitacion: number): Promise<ConfigSensor[]> {
        const config = this.repository.find({ where: { habitacion: { id_habitacion: id_habitacion } } })

        return config
    }

    async save(modelodb: ConfigSensor): Promise<ConfigSensor> {
        const { ishabitacion, ...data } = modelodb

        const { habitacion, ...res } = await this.repository.save({
            ...data,
            habitacion: HabitacionMapper.toPersistencia(ishabitacion)
        })


        return {
            ...res
        }
    }
    findByOne(id: string): Promise<ConfigSensor> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<ConfigSensor[]> {
        throw new Error("Method not implemented.");
    }
    update(id: string, modelodb: Partial<ConfigSensor>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}