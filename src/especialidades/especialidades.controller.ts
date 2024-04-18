import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';
import { CreateEspecialidadeDto } from './applicacion/dto/create-especialidade.dto';
import { EspecialidadesService } from './applicacion/especialidades.service';

@Controller('especialidades')
export class EspecialidadesController {
    constructor(private readonly especialidadesService: EspecialidadesService) { }

    @Post()
    create(@Body() createEspecialidadeDto: CreateEspecialidadeDto) {
        return this.especialidadesService.create(createEspecialidadeDto);
    }

    @Get()
    findAll() {
        return this.especialidadesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.especialidadesService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.especialidadesService.remove(+id);
    }
}
