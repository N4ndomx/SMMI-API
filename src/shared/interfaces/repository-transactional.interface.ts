export const IRepositoryTransactionalToken = Symbol('IRepositoryTransactional');
export interface IRepositoryTransactional<entity, ID, EntityManager> {
  save(modelodb: entity, transactionRunner?: EntityManager): Promise<entity>;
  findByOne(id: ID, transactionRunner?: EntityManager): Promise<entity>;
  findAll(transactionRunner?: EntityManager): Promise<entity[]>;
  update(id: string, modelodb: entity, transactionRunner?: EntityManager): Promise<boolean>;
}
