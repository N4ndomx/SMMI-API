import { Inject, Injectable } from '@nestjs/common';
import { IMapper, IMapperToken } from 'src/shared/interfaces/mapper.interface';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class TransactionTypeorm {
  queryRunner: QueryRunner = null;

  constructor(private readonly dataSourse: DataSource) {
    this.queryRunner = this.dataSourse.createQueryRunner();
  }

  async startTransaccion() {
    this.queryRunner = this.dataSourse.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
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

  async save<entity, dbModel>(
    modelo: entity,
    mapper: IMapper<entity, dbModel>,
  ): Promise<entity> {
    const modelodb = mapper.toPersistencia(modelo);
    const dbm = await this.queryRunner.manager.save(modelodb);
    return mapper.toDomain(dbm);
  }
}
