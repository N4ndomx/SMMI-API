import { Module } from '@nestjs/common';
import { ConfigSensoresService } from './aplicacion/config_sensores.service';
import { ConfigSensoresController } from './config_sensores.controller';
import { SharedModule } from 'src/shared/shared.module';
import { HabitacionesModule } from 'src/habitaciones/habitaciones.module';
import { SensorData } from 'src/sensores/domain/entities/sensore.entity';
import { SensoresModule } from 'src/sensores/sensores.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigSensorModel } from './infra/persistencia/models/config_sensores.model';
import { ConfigSensorRepository } from './infra/persistencia/config_sensor.repository';
import { ICatalogoSensorRepositoryToken } from 'src/sensores/domain/interface/catalogo-sensores-interface';
import { CatalogoSensoresRepository } from 'src/sensores/infra/persistencia/catalogo-sensores.repository';
import { IConfigSensorRepository } from './dominio/interface/config_sensor-repo.interface';
import { MqttModule } from 'src/mqtt/mqtt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConfigSensorModel]),
    SharedModule,
    HabitacionesModule,
    SensoresModule,
    MqttModule
  ],
  controllers: [ConfigSensoresController],
  providers: [ConfigSensoresService, ConfigSensorRepository, {
    provide: IConfigSensorRepository,
    useExisting: ConfigSensorRepository
  },
    {
      provide: ICatalogoSensorRepositoryToken,
      useExisting: CatalogoSensoresRepository
    }],
  exports: [ConfigSensoresService,]
})
export class ConfigSensoresModule { }
