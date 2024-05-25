import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ConfigSensoresService } from './aplicacion/config_sensores.service';
import { CreateConfigSensoreDto } from './aplicacion/dto/create-config_sensore.dto';
import { UpdateConfigSensoreDto } from './aplicacion/dto/update-config_sensore.dto';

@Controller('config-sensores')
export class ConfigSensoresController {
  constructor(private readonly configSensoresService: ConfigSensoresService) { }

  @Post()
  create(@Body() createConfigSensoreDto: CreateConfigSensoreDto) {
    return this.configSensoresService.create(createConfigSensoreDto);
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id_hab: number) {
    // console.log(termino)
    return this.configSensoresService.finByHabitacion(id_hab);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configSensoresService.remove(+id);
  }
}
