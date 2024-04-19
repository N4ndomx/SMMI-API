import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnfermeraModel } from 'src/enfermeras/infra/persistencia/models/enfermera.model';
import { EspecialidadModel } from 'src/especialidades/infra/persistencia/models/especialidades.model';
import { Medico_Especialidad_Model } from 'src/especialidades/infra/persistencia/models/medico-especialidad.model';
import { MedicoModel } from 'src/medicos/infra/persistencia/models/medico.model';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      username: process.env.DATABASE_USERNAME,
      entities: [MedicoModel,EnfermeraModel,EspecialidadModel,Medico_Especialidad_Model],
      autoLoadEntities: true,
      extra: {
        ssl: true,
        sslmode: 'require',
      },
      // carga auto las entidades
      // migrations: ["dist/migrations/*.migration.ts"],
    };
  }
}
