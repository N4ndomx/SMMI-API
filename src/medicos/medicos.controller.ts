import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicosService } from './aplicacion/medicos.service';
import { CreateMedicoDto } from './aplicacion/dto/create-medico.dto';
import { TerminoValidate } from 'src/shared/pipes/termino.pipe';
import { OpcionFiedOne } from 'src/auth/aplicacion/dto/opcion-fiedOne.dto';

@Controller('medicos')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @Post()
  create(@Body() createMedicoDto: CreateMedicoDto) {
    return this.medicosService.create(createMedicoDto);
  }

  @Get()
  findAll() {
    return this.medicosService.findAll();
  }

  @Get(':termino')
  findOne(@Param('termino', TerminoValidate) termino: OpcionFiedOne) {
    // console.log(termino)
    return this.medicosService.findOne(termino);
  }
}
