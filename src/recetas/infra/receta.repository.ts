import { InjectRepository } from "@nestjs/typeorm";
import { Receta } from "../dominio/entities/receta.entity";
import { IRecetaRepository } from "../dominio/interface/receta-repository.interface";
import { RecetaMapper } from "../receta.mapper";
import { RecetaModel } from "./model/receta.model";
import { Repository } from "typeorm";

export class RecetaRepository implements IRecetaRepository {
    constructor(
        @InjectRepository(RecetaModel)
        private readonly recetaRepository: Repository<RecetaModel>
    ) { }
    async findByIngreso(id_ingreso: string): Promise<Receta[]> {
        const data = await this.recetaRepository.find({ where: { ingreso: { id_ingreso: id_ingreso } } })
        return data.map((dbm) => RecetaMapper.toDomain(dbm));
    }
    async save(modelodb: Receta): Promise<Receta> {

        const db = RecetaMapper.toPersistencia(modelodb)
        const res = await this.recetaRepository.save(db)
        console.log(res)
        return RecetaMapper.toDomain(res)
    }
    findByOne(id: string): Promise<Receta> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Receta[]> {
        throw new Error("Method not implemented.");
    }
    update(id: string, modelodb: Partial<Receta>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}