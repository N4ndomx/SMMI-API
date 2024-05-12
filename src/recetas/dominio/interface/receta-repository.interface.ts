import { IRepository } from "src/shared/interfaces/repository.interface";
import { Receta } from "../entities/receta.entity";

export const IRecetaRepositoryToken = Symbol('IRecetaRepository');
export interface IRecetaRepository extends IRepository<Receta, string> {
    findByIngreso(id_ingreso: string): Promise<Receta[]>
}