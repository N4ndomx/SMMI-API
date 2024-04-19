import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { ITransactionRunner } from "./transactions.interface";
import { TransactionRunner } from "./typeorm-transaction.implem";

@Injectable()
export class DbTransactionFactory {
    constructor(private readonly dataSource: DataSource) { }

    async createTransaction(): Promise<ITransactionRunner> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        return new TransactionRunner(queryRunner);
    }
}