import { Module } from '@nestjs/common';
import { MedicosService } from './aplicacion/medicos.service';
import { MedicosController } from './medicos.controller';
import { SharedModule } from 'src/shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoModel } from './infra/persistencia/models/medico.model';
import { MedicoRepository } from './infra/persistencia/medicos-repository.typeorm';
import { MedicoMapper } from './medicos.mapper';
import { IMapperToken } from 'src/shared/interfaces/mapper.interface';
import { IMedicoRepositoryToken } from './domain/interfaces/medico-repository.interface';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([MedicoModel])],
  controllers: [MedicosController],
  providers: [
    MedicosService,
    MedicoRepository,
    // {
    //   provide: IRepositoryToken,
    //   useExisting: MedicoRepository
    // },
    {
      provide: IMedicoRepositoryToken,
      useClass: MedicoRepository,
    },
    MedicoMapper,
    {
      provide: IMapperToken,
      useExisting: MedicoMapper,
    },
  ],
  exports: [MedicosService, MedicoRepository, IMedicoRepositoryToken],
})
export class MedicosModule { }
