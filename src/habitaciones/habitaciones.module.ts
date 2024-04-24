import { Module } from '@nestjs/common';
import { HabitacionesService } from './aplicacion/habitaciones.service';
import { HabitacionesController } from './habitaciones.controller';
import { HabitacionesRepository } from './infra/persistencia/habitaciones.repository';
import { IHabitacionRepositoryToken } from './domain/interface/habitacion-repository.interface';
import { SharedModule } from 'src/shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitacionModel } from './infra/persistencia/models/habitaciones.model';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([HabitacionModel])],
  controllers: [HabitacionesController],
  providers: [HabitacionesService,
    HabitacionesRepository,
    {
      provide: IHabitacionRepositoryToken,
      useExisting: HabitacionesRepository
    }
  ],
  exports: [HabitacionesService, HabitacionesRepository, IHabitacionRepositoryToken],
})
export class HabitacionesModule { }
