import { ConfigSensor } from "src/config_sensores/dominio/entities/config_sensore.entity";
import { IRepository } from "src/shared/interfaces/repository.interface";

export const IConfigSensorRepository = Symbol('IConfigSensorRepository');
export interface IConfigSensorRepository extends IRepository<ConfigSensor, string> {

}
