import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnfermerasService } from './aplicacion/enfermeras.service';
import { CreateEnfermeraDto } from './aplicacion/dto/create-enfermera.dto';
import { UpdateEnfermeraDto } from './aplicacion/dto/update-enfermera.dto';
import { TerminoValidate } from 'src/shared/pipes/termino.pipe';
import { OpcionFiedOne } from 'src/shared/interfaces/opcion-fiedOne.dto';

@Controller('enfermeras')
export class EnfermerasController {
  constructor(private readonly enfermerasService: EnfermerasService) { }

  @Post()
  create(@Body() createEnfermeraDto: CreateEnfermeraDto) {
    return this.enfermerasService.create(createEnfermeraDto);
  }

  @Get()
  findAll() {
    return this.enfermerasService.findAll();
  }

  @Get(':termino')
  findOne(@Param('termino', TerminoValidate) termino: OpcionFiedOne) {
    // console.log(termino)
    return this.enfermerasService.findOne(termino);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnfermeraDto: UpdateEnfermeraDto) {
    return this.enfermerasService.update(+id, updateEnfermeraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enfermerasService.remove(+id);
  }
}
