import { PartialType } from '@nestjs/mapped-types';
import { CreateAlertasReporteDto } from './create-alertas-reporte.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAlertasReporteDto extends PartialType(CreateAlertasReporteDto) {
    @IsString()
    @IsNotEmpty()
    evento_critico: string
    @IsString()
    @IsNotEmpty()
    acciones_tomadas: string
}
