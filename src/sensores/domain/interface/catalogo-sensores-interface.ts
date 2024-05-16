import { IRepository } from "../../../shared/interfaces/repository.interface";
import { SensorDataModel } from "src/sensores/infra/persistencia/models/sensor.model";
import { SensorData } from "../entities/sensore.entity";
import { CatalogoSensor } from "../entities/catalogo-sensor.entity";

export const ICatalogoSensorRepositoryToken = Symbol('ICatalogoSensorRepository');
export interface ICatalogoSensorRepository extends IRepository<CatalogoSensor, number> {
    findByTopico(topico: string): Promise<CatalogoSensor>
}