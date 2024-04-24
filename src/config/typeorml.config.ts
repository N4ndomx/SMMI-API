import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CatalogoSensoresModel, EmpleadoModel, EnfermeraModel, EspecialidadesModule, HabitacionModel, MedicoModel, Medico_Especialidad_Model, SensorDataModel } from 'src/shared/models';


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
      entities: [CatalogoSensoresModel, EmpleadoModel, EnfermeraModel, EspecialidadesModule, HabitacionModel, MedicoModel, Medico_Especialidad_Model, SensorDataModel],
      autoLoadEntities: true,
      extra: {
        ssl: true,
        sslmode: 'require',
      },
      // synchronize: true,
      // dropSchema: true,

      // migrations: ["dist/migrations/*.migration.ts"],
    };
  }
}
