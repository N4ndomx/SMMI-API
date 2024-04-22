import { Module } from '@nestjs/common';
import { SensoresDataService } from './aplicacion/sensores.service';
import { SensoresController } from './sensores.controller';
import { DbTransactionFactory } from 'src/shared/interfaces/TransactionFactory/transaction.factory';
import { SharedModule } from 'src/shared/shared.module';
import { SensoresDataRepository } from './infra/persistencia/sensores.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorDataModel } from './infra/persistencia/models/sensor.model';
import { ISensorDataRepositoryToken } from './domain/interface/sensores-interface';
import { CatalogoSensoresRepository } from './infra/persistencia/catalogo-sensores.repository';
import { ICatalogoSensorRepositoryToken } from './domain/interface/catalogo-sensores-interface';
import { CatalogoSensoresModel } from './infra/persistencia/models/catalogo-sensores.model';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([SensorDataModel, CatalogoSensoresModel])],
  controllers: [SensoresController],
  providers: [SensoresDataService,
    SensoresDataRepository,
    {
      provide: ISensorDataRepositoryToken,
      useExisting: SensoresDataRepository
    },
    CatalogoSensoresRepository,
    {
      provide: ICatalogoSensorRepositoryToken,
      useExisting: CatalogoSensoresRepository
    }
  ]
})
export class SensoresModule { }
