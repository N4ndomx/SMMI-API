import { Controller, Get, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { RecetasService } from './aplicacion/recetas.service';
import { CreateRecetaDto } from './aplicacion/dto/create-receta.dto';

@Controller('recetas')
export class RecetasController {
  constructor(private readonly recetasService: RecetasService) { }

  @Post()
  create(@Body() createRecetaDto: CreateRecetaDto) {
    return this.recetasService.create(createRecetaDto);
  }


  @Get(':id')
  findOneByingreso(@Param('id', ParseUUIDPipe) id: string) {
    return this.recetasService.findOneByIngreso(id);
  }

}
