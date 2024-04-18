import { Module } from '@nestjs/common';
import { MedicosModule } from './medicos/medicos.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfig } from './config/typeorml.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { EnfermerasModule } from './enfermeras/enfermeras.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
