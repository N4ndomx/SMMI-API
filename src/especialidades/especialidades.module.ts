import { Module } from '@nestjs/common';
import { EspecialidadesService } from './applicacion/especialidades.service';
import { EspecialidadesController } from './especialidades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspecialidadModel } from './infra/persistencia/models/especialidades.model';
import { EspecialidadRepository } from './infra/persistencia/especialida.repository';
import { IEspecialidadRepositoryToken } from './domain/interfaces/especialidad-reposirory.interface';
import { Medico_Especialidad_Model } from './infra/persistencia/models/medico-especialidad.model';
import { MedicoEspecialidadRepository } from './infra/persistencia/medico-especialidad.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([EspecialidadModel, Medico_Especialidad_Model]),
    ],
    exports: [EspecialidadesService],
    controllers: [EspecialidadesController],
    providers: [
        EspecialidadesService,
        EspecialidadRepository,
        {
            provide: IEspecialidadRepositoryToken,
            useClass: EspecialidadRepository,
        },
        MedicoEspecialidadRepository

    ],
})
export class EspecialidadesModule { }
