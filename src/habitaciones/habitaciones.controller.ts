import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HabitacionesService } from './aplicacion/habitaciones.service';
import { CreateHabitacioneDto } from './aplicacion/dto/create-habitacione.dto';
import { UpdateHabitacioneDto } from './aplicacion/dto/update-habitacione.dto';

@Controller('habitaciones')
export class HabitacionesController {
  constructor(private readonly habitacionesService: HabitacionesService) { }

  @Post()
  create(@Body() createHabitacioneDto: CreateHabitacioneDto) {
    return this.habitacionesService.create(createHabitacioneDto);
  }

  @Get()
  findAll() {
    return this.habitacionesService.findAll();
  }

  @Get("/ocupados")
  findAllOcupados() {
    return this.habitacionesService.findOcupados();
  }

  @Get("/desocupados")
  findAllDesocupados() {
    return this.habitacionesService.findDesocupados();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitacioneDto: UpdateHabitacioneDto) {
    return this.habitacionesService.update(+id, updateHabitacioneDto);
  }

}
