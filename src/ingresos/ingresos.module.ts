import { Module } from '@nestjs/common';
import { IngresosService } from './aplicacion/ingresos.service';
import { IngresosController } from './ingresos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngresoModel } from './infra/models/ingreso.model';
import { HabitacionesModule } from 'src/habitaciones/habitaciones.module';
import { EnfermerasModule } from 'src/enfermeras/enfermeras.module';
import { EspecialidadesModule } from 'src/especialidades/especialidades.module';
import { SharedModule } from 'src/shared/shared.module';
import { IngresosRepository } from './infra/ingresos.repository';
import { IIngresosRepositoryToken } from './domain/interfaces/ingresos-repository.interface';

@Module({
  imports: [
    SharedModule,
    HabitacionesModule,
    EnfermerasModule,
    EspecialidadesModule,
    TypeOrmModule.forFeature([IngresoModel])],
  controllers: [IngresosController],
  providers: [IngresosService,
    IngresosRepository,
    {
      provide: IIngresosRepositoryToken,
      useExisting: IngresosRepository,
    }
  ],
  exports: [IngresosService, IngresosRepository, {
    provide: IIngresosRepositoryToken,
    useExisting: IngresosRepository,
  }]
})
export class IngresosModule { }
