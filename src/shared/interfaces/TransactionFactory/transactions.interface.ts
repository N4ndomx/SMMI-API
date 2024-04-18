import { EntityManager } from "typeorm";

export const ITransactionRunner = Symbol('ITransactionRunner');

export interface ITransactionRunner {
    startTransaction(): Promise<void>;
    commitTransaction(): Promise<void>;
    rollbackTransaction(): Promise<void>;
    releaseTransaction(): Promise<void>;
    get transactionManager(): EntityManager
}