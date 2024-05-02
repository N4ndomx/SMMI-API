import { IRepository } from "src/shared/interfaces/repository.interface";
import { Ingreso } from "../entities/ingreso.entity";

export const IIngresosRepositoryToken = Symbol('IIngresosRepository');
export interface IIngresosRepository extends IRepository<Ingreso, string> {
    findAll_No_Alta(): Promise<Ingreso[]>
}