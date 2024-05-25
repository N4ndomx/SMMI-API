import { IRepository } from "../../../shared/interfaces/repository.interface";
import { SensorDataModel } from "src/sensores/infra/persistencia/models/sensor.model";
import { SensorData } from "../entities/sensore.entity";
export interface FindDataBySensorOptions {
    id_habitacion: number;
    topico?: string;
    fecha_init?: string;
    fecha_end?: string;
    hora_init?: string
    hora_end?: string

}
export const ISensorDataRepositoryToken = Symbol('ISensorRepository');
export interface ISensorDataRepository extends IRepository<SensorData, number> {
    findDataBySensor(options: FindDataBySensorOptions): Promise<SensorData[]>
}