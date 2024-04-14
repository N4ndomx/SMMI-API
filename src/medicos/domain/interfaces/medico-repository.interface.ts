import { IRepository } from 'src/shared/interfaces/repository.interface';
import { Medico } from 'src/medicos/domain/entities/medico.entity';
export const IMedicoRepositoryToken = Symbol('IMedicoRepository');
export interface IMedicoRepository extends IRepository<Medico, string> {
  findByCURP(curp: string): Promise<Medico>;
}
