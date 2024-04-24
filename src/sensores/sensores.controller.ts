import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Req } from '@nestjs/common';
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
  @Get("/seed")
  create_sensor(body: any) {
    return this.sensoresService.create_catalogo_sensores()
  }
  @Get("/catalogo")
  findAll() {
    return this.sensoresService.findAll();
  }

}
