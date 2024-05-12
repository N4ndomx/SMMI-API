import { Module } from '@nestjs/common';
import { MedicosService } from './aplicacion/medicos.service';
import { MedicosController } from './medicos.controller';
import { SharedModule } from 'src/shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoModel } from './infra/persistencia/models/medico.model';
import { MedicoRepository } from './infra/persistencia/medicos-typeorm.repository';
import { MedicoMapper } from './medicos.mapper';
import { IMapperToken } from 'src/shared/interfaces/mapper.interface';
import { IMedicoRepositoryToken } from './domain/interfaces/medico-repository.interface';
import { EspecialidadesModule } from 'src/especialidades/especialidades.module';
import { IngresosModule } from 'src/ingresos/ingresos.module';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([MedicoModel]),
    EspecialidadesModule,
    IngresosModule
  ],
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

  ],
  exports: [MedicosService, MedicoRepository, IMedicoRepositoryToken],
})
export class MedicosModule { }
