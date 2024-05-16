import { Injectable } from "@nestjs/common";
import { Ingreso } from "../domain/entities/ingreso.entity";
import { IIngresosRepository } from "../domain/interfaces/ingresos-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { IngresoModel } from "./models/ingreso.model";
import { Repository } from "typeorm";
import { IngresoMapper } from "../ingreso.mapper";
@Injectable()
export class IngresosRepository implements IIngresosRepository {
    constructor(
        @InjectRepository(IngresoModel)
        private readonly repository: Repository<IngresoModel>
    ) { }
    async findByNombreCompleto(nombres: string): Promise<Ingreso[]> {
        const ingresos = await this.repository
            .createQueryBuilder('ingresos')
            .innerJoinAndSelect('ingresos.id_habitacion', 'Habitaciones')
            .innerJoinAndSelect('ingresos.id_enfermera', 'Enfermeras')
            .innerJoinAndSelect('Enfermeras.empleado', 'Empleados')
            .innerJoinAndSelect('ingresos.id_especialidad', 'Catalogo_Especialidades')

            .where("CONCAT(ingresos.nombres, ' ', ingresos.apellidos) = :nombreCompleto", { nombreCompleto: nombres })
            .getMany();
        console.log(ingresos)
        return ingresos.map((dbm) => IngresoMapper.toDomain(dbm));
    }
    async findAll_No_Alta(): Promise<Ingreso[]> {
        const data = await this.repository.find({ where: { de_alta: false } })
        return data.map((dbm) => IngresoMapper.toDomain(dbm));
    }
    async find_asignados_enfermera(matricula_enf: string): Promise<Ingreso[]> {
        const data = await this.repository.find({ where: { id_enfermera: { matriculaEnfermera: matricula_enf }, de_alta: false } })
        return data.map((dbm) => IngresoMapper.toDomain(dbm));
    }

    async findByEspecialidad(id_especialidad: number): Promise<Ingreso[]> {
        const data = await this.repository.find({ where: { id_especialidad: { id: id_especialidad } } })
        return data.map((dbm) => IngresoMapper.toDomain(dbm));
    }
    async save(modelodb: Ingreso): Promise<Ingreso> {
        const db = IngresoMapper.toPersistencia(modelodb)
        const res = await this.repository.save(db)
        return IngresoMapper.toDomain(res)
    }
    async findByOne(id: string): Promise<Ingreso> {
        const res = await this.repository.findOneBy({ id_ingreso: id })

        return res ? IngresoMapper.toDomain(res) : null
    }
    async findAll(): Promise<Ingreso[]> {
        const data = await this.repository.find()

        return data.map((dbm) => {
            dbm.id_habitacion.config_sensores = null
            return IngresoMapper.toDomain(dbm)
        });

    }
    async update(id: string, modelodb: Ingreso): Promise<boolean> {
        const db = IngresoMapper.toPersistencia(modelodb)
        const re = this.repository.update({ id_ingreso: id }, db)
        return true;
    }
}