import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configSensoresService.remove(+id);
  }
}
