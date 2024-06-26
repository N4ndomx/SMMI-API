import { Module } from '@nestjs/common';
import { MedicosModule } from './medicos/medicos.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfig } from './config/typeorml.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { EnfermerasModule } from './enfermeras/enfermeras.module';
import { SensoresModule } from './sensores/sensores.module';
import { HabitacionesModule } from './habitaciones/habitaciones.module';
import { AdminModule } from './admin/admin.module';
import { IngresosModule } from './ingresos/ingresos.module';
import { RecetasModule } from './recetas/recetas.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfig,
    }),
    MedicosModule,
    SharedModule,
    AuthModule,
    EspecialidadesModule,
    EnfermerasModule,
    SensoresModule,
    HabitacionesModule,
    AdminModule,
    IngresosModule,
    RecetasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
