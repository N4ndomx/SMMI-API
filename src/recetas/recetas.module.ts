import { Module } from '@nestjs/common';
import { RecetasService } from './aplicacion/recetas.service';
import { RecetasController } from './recetas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetaModel } from './infra/model/receta.model';
import { SharedModule } from 'src/shared/shared.module';
import { MedicoModel } from 'src/medicos/infra/persistencia/models/medico.model';
import { IngresoModel } from 'src/ingresos/infra/models/ingreso.model';
import { RecetaRepository } from './infra/receta.repository';
import { IRepositoryToken } from 'src/shared/interfaces/repository.interface';
import { IRecetaRepositoryToken } from './dominio/interface/receta-repository.interface';
import { MedicosModule } from 'src/medicos/medicos.module';
import { IngresosModule } from 'src/ingresos/ingresos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecetaModel]), SharedModule, MedicosModule, IngresosModule],
  controllers: [RecetasController],
  providers: [RecetasService,
    RecetaRepository,
    {
      provide: IRecetaRepositoryToken,
      useExisting: RecetaRepository
    },
  ],
})
export class RecetasModule { }
