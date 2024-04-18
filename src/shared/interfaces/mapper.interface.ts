export const IMapperToken = Symbol('IMapper');

export interface IMapper<DomainEntity, DbModel> {
  toPersistencia(entity: DomainEntity): DbModel;
  toDomain(dbModel: DbModel): DomainEntity;
  // toResponse(entity: DomainEntity): ResponseDTO;
}
