import { Module } from '@nestjs/common';
import { EnfermerasService } from './aplicacion/enfermeras.service';
import { EnfermerasController } from './enfermeras.controller';
import { EnfermeraRepository } from './infra/persistencia/enfermeras.repository';
import { IEnfermeraRepositoryToken } from './domain/interface/enfermera-repository.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnfermeraModel } from './infra/persistencia/models/enfermera.model';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([EnfermeraModel])],
  controllers: [EnfermerasController],
  providers: [EnfermerasService, EnfermeraRepository, {
    provide: IEnfermeraRepositoryToken,
    useExisting: EnfermeraRepository
  }],
  exports: [EnfermerasService]
})
export class EnfermerasModule { }
