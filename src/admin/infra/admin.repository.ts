import { ITransactionRunner } from "src/shared/interfaces/TransactionFactory/transactions.interface";
import { Repository } from "typeorm";
import { IAdminRepository } from "../domain/interfaces/admin-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminModel } from "./model/Admin.model";
import { AdminMapper } from "../admin.mapper";
import { Admin } from "../domain/entities/admin.entity";

export class AdminRepository implements IAdminRepository {
    constructor(
        @InjectRepository(AdminModel)
        private readonly repository: Repository<AdminModel>,
    ) { }
    async findByCURP(curp: string, transactionRunner?: ITransactionRunner): Promise<Admin> {
        console.log(curp)
        const queryOptions: any = {
            relations: ['empleado'],
            where: {
                empleado: { curp: curp },
            },
        };
        const product = transactionRunner
            ? await transactionRunner.transactionManager.findOne(AdminModel, queryOptions)
            : await this.repository.findOne(queryOptions)

        return product ? AdminMapper.toDomain(product) : null;
    }
    async save(modelodb: Admin, transactionRunner?: ITransactionRunner): Promise<Admin> {
        const dbr = transactionRunner
            ? await transactionRunner.transactionManager.save(AdminModel, AdminMapper.toPersistencia(modelodb))
            : await this.repository.save(AdminMapper.toPersistencia(modelodb));

        return dbr ? AdminMapper.toDomain(dbr) : null;
    }
    async findByOne(id: string, transactionRunner?: ITransactionRunner): Promise<Admin> {
        const queryOptions: any = {
            relations: ['empleado',],
            where: {
                matriculaAdmin: id,
            },
        };

        const product = transactionRunner
            ? await transactionRunner.transactionManager.findOne(AdminModel, queryOptions)
            : await this.repository.findOne(queryOptions);

        return product ? AdminMapper.toDomain(product) : null;
    }
    async findAll(transactionRunner?: ITransactionRunner): Promise<Admin[]> {
        const dbr = transactionRunner
            ? await transactionRunner.transactionManager.find(AdminModel)
            : await this.repository.find();

        return dbr.map((dbm) => AdminMapper.toDomain(dbm));
    }
    update(id: string, modelodb: Admin, transactionRunner?: ITransactionRunner): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}