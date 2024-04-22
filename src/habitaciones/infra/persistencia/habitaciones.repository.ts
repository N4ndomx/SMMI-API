import { Habitacion } from "src/habitaciones/domain/entities/habitacione.entity";
import { IHabitacionRepository } from "src/habitaciones/domain/interface/habitacion-repository.interface";
import { Repository } from "typeorm";
import { HabitacionModel } from "./models/habitaciones.model";
import { InjectRepository } from "@nestjs/typeorm";
import { HabitacionMapper } from "src/habitaciones/habitaciones.mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HabitacionesRepository implements IHabitacionRepository {
    constructor(
        @InjectRepository(HabitacionModel)
        private readonly repository: Repository<HabitacionModel>
    ) { }
    async save(modelodb: Habitacion): Promise<Habitacion> {

        const db = await this.repository.save(HabitacionMapper.toPersistencia(modelodb))
        return db ? HabitacionMapper.toDomain(db) : null
    }
    async findByOne(id: number): Promise<Habitacion> {
        const db = await this.repository.findOneBy({ id_habitacion: id })
        return db ? HabitacionMapper.toDomain(db) : null
    }
    async findAll(): Promise<Habitacion[]> {
        const db = await this.repository.find()
        return db.map((hab) => HabitacionMapper.toDomain(hab))
    }
    async update(id: number, modelodb: Partial<Habitacion>): Promise<boolean> {
        const db = await this.repository.update(id, modelodb)
        console.log(db)
        return db ? true : false
    }
    async getAllOcupados(): Promise<Habitacion[]> {
        const db = await this.repository.find({ where: { ocupado: true } })
        return db.map((mod) => HabitacionMapper.toDomain(mod))
    }
    async getAllDesocupados(): Promise<Habitacion[]> {
        const db = await this.repository.find({ where: { ocupado: false } })
        return db.map((mod) => HabitacionMapper.toDomain(mod))
    }
}