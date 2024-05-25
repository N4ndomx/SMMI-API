import { Module } from '@nestjs/common';
import { AlertasReportesService } from './aplicacion/alertas-reportes.service';
import { AlertasReportesController } from './alertas-reportes.controller';
import { MqttModule } from 'src/mqtt/mqtt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReporteAlertaModel } from './infra/model/reporte-alerta.model';
import { SensoresModule } from 'src/sensores/sensores.module';
import { IngresosModule } from 'src/ingresos/ingresos.module';
import { ReporteAlertasRepository } from './infra/alerta-reporte.repository';
import { IRecetaRepositoryToken } from 'src/recetas/dominio/interface/receta-repository.interface';
import { IReporteAlertasRepositoryToken } from './dominio/interface/alertas-reporte-repository.interface';

@Module({
  imports: [MqttModule, TypeOrmModule.forFeature([ReporteAlertaModel]), SensoresModule, IngresosModule],
  controllers: [AlertasReportesController],
  providers: [
    AlertasReportesService,
    ReporteAlertasRepository,
    {
      provide: IReporteAlertasRepositoryToken,
      useExisting: ReporteAlertasRepository
    }
  ],
})
export class AlertasReportesModule { }
