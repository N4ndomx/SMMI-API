export const IRepositoryToken = Symbol('IRepository');
export interface IRepository<ENTITY, ID> {
  save(modelodb: ENTITY): Promise<ENTITY>;
  findByOne(id: ID): Promise<ENTITY>;
  findAll(): Promise<ENTITY[]>;
  update(id: string, modelodb: ENTITY): Promise<boolean>;
}
