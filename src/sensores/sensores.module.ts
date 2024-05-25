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
import { HabitacionModel } from 'src/habitaciones/infra/persistencia/models/habitaciones.model';
import { HabitacionesModule } from 'src/habitaciones/habitaciones.module';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([SensorDataModel, CatalogoSensoresModel]), HabitacionesModule],
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
  ],
  exports: [CatalogoSensoresRepository, {
    provide: ICatalogoSensorRepositoryToken,
    useExisting: CatalogoSensoresRepository
  },
    {
      provide: ISensorDataRepositoryToken,
      useExisting: SensoresDataRepository
    }]
})
export class SensoresModule { }
