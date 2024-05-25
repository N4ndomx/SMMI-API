import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { AlertasReportesService } from './aplicacion/alertas-reportes.service';
import { CreateAlertasReporteDto } from './aplicacion/dto/create-alertas-reporte.dto';
import { UpdateAlertasReporteDto } from './aplicacion/dto/update-alertas-reporte.dto';

@Controller('alertas-reportes')
export class AlertasReportesController {
  constructor(private readonly alertasReportesService: AlertasReportesService) { }


  @Get('/comp/:id_ingreso')
  findAllCompletos(@Param('id_ingreso', ParseUUIDPipe) id: string) {
    return this.alertasReportesService.findAllCompletadosByIngreso(id);

  }
  @Get('/incomp/:id_ingreso')
  findAllInconmpletos(@Param('id_ingreso', ParseUUIDPipe) id: string) {
    return this.alertasReportesService.findSinCompletarByIngreso(id);

  }

  @Get(':id_ingreso')
  findAll(@Param('id_ingreso', ParseUUIDPipe) id: string) {
    return this.alertasReportesService.findAllbyIngreso(id);

  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAlertasReporteDto: UpdateAlertasReporteDto) {
    return this.alertasReportesService.update(id, updateAlertasReporteDto);
  }

}
