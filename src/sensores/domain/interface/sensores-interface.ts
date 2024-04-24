import { IRepository } from "../../../shared/interfaces/repository.interface";
import { SensorDataModel } from "src/sensores/infra/persistencia/models/sensor.model";
import { SensorData } from "../entities/sensore.entity";

export const ISensorDataRepositoryToken = Symbol('ISensorRepository');
export interface ISensorDataRepository extends IRepository<SensorData, number> {
}