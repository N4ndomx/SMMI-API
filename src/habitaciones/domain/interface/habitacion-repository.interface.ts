import { IRepository } from "src/shared/interfaces/repository.interface";
import { Habitacion } from "../entities/habitacione.entity";

export const IHabitacionRepositoryToken = Symbol('IHabitacionRepository');
export interface IHabitacionRepository extends IRepository<Habitacion, number> {
    getAllOcupados(): Promise<Habitacion[]>
    getAllDesocupados(): Promise<Habitacion[]>

}