import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Req, ParseIntPipe, Query } from '@nestjs/common';
import { SensoresDataService } from './aplicacion/sensores.service';
import { UpdateSensoreDto } from './aplicacion/dto/update-sensore.dto';
import { EmqxTransfrormPipe } from 'src/sensores/infra/pipes/emqx.transform.pipe';

@Controller('sensores')
export class SensoresController {
  constructor(private readonly sensoresService: SensoresDataService) { }
  @HttpCode(200)
  @Post()
  create(@Body(EmqxTransfrormPipe) body: any) {
    return this.sensoresService.create(body)
  }
  @Get()
  findAll() {
    return this.sensoresService.findAllData();
  }
  @Get("/seed")
  create_sensor(body: any) {
    return this.sensoresService.create_catalogo_sensores()
  }
  @Get("/catalogo")
  findAllCatalogo() {
    return this.sensoresService.findAllCatalogo();
  }
  @Get("/estadi")
  findDataBySensor(
    @Query('topico') topico: string,
    @Query('habitacion') id_hab: number,
    @Query('fechainit') fecha_init: string,
    @Query('fechaend') fecha_end: string,
  ) {
    return this.sensoresService.findDataBySensor(id_hab, topico, fecha_init, fecha_end)
  }

}
