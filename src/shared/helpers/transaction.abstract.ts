import { Inject, Injectable } from "@nestjs/common";
import { IMapper, IMapperToken } from "src/shared/interfaces/mapper.interface";
import { IRepository } from "src/shared/interfaces/repository.interface";
import { DataSource, QueryRunner } from "typeorm";

@Injectable()
export abstract class TransactionTypeorm<db, entity, id> implements IRepository<entity, id> {

    queryRunner: QueryRunner = null

    constructor(
        private readonly dataSourse: DataSource,
        @Inject(IMapperToken)
        private readonly mapper: IMapper<entity, db>
    ) {
        this.queryRunner = this.dataSourse.createQueryRunner()
    }

    async startTransaccion() {
        this.queryRunner = this.dataSourse.createQueryRunner()
        await this.queryRunner.connect()
        await this.queryRunner.startTransaction()
    }

    async commit() {
        await this.queryRunner.commitTransaction();
    }

    async rollback() {
        await this.queryRunner.rollbackTransaction();
    }

    async release() {
        await this.queryRunner.release();
    }


    async save(modelo: entity): Promise<entity> {
        const modelodb = this.mapper.toPersistencia(modelo)
        const dbm = await this.queryRunner.manager.save(modelodb)
        return this.mapper.toDomain(dbm)
    }
    findByOne(id: id): Promise<entity> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<entity[]> {
        throw new Error("Method not implemented.");
    }
    update(id: string, modelodb: entity): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}