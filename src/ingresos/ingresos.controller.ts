import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ParseIntPipe, Query } from '@nestjs/common';
import { IngresosService } from './aplicacion/ingresos.service';
import { CreateIngresoDto } from './aplicacion/dto/create-ingreso.dto';

@Controller('ingresos')
export class IngresosController {
  constructor(private readonly ingresosService: IngresosService) { }

  @Post()
  create(@Body() createIngresoDto: CreateIngresoDto) {
    return this.ingresosService.create(createIngresoDto);
  }

  @Get()
  async findAll() {
    return await this.ingresosService.findAll();
  }
  @Get('/busq')
  async findbyNombre(@Query('nombre') nombreCompleto: string) {
    return this.ingresosService.findByNombres(nombreCompleto)
  }
  @Get("/activos")
  async findAllSinAlta() {
    return await this.ingresosService.findAllSinAlta()
  }

  @Get('enfermera/:nurseId')
  getPatientsAssignedToNurse(@Param('nurseId') nurseId: string) {
    return this.ingresosService.asignados_enfermera(nurseId)
  }

  @Get('especialidad/:Id')
  getByEspecialidad(@Param('Id', ParseIntPipe) idEspecialidad: number) {
    return this.ingresosService.findByEspecialidad(idEspecialidad)
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ingresosService.findOne(id);
  }

  @Patch(':id')
  dar_alta(@Param('id', ParseUUIDPipe) id: string) {

    return this.ingresosService.dar_alta(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingresosService.remove(+id);
  }
}
