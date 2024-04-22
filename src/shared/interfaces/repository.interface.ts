export const IRepositoryToken = Symbol('IRepository');
export interface IRepository<entity, ID,> {
    save(modelodb: entity,): Promise<entity>;
    findByOne(id: ID,): Promise<entity>;
    findAll(): Promise<entity[]>;
    update(id: string, modelodb: entity): Promise<boolean>;
}
