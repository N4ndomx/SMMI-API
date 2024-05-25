import { IsInt, IsNumber, IsString } from "class-validator"

export class CreateAlertasReporteDto {
    @IsNumber()
    duracion_emergencia: number
    fecha_registro: Date
    @IsNumber()
    id_habi: number
    @IsInt()
    startTime_emergencia: number;
    @IsInt()
    endTime_enmergencia?: number;


}
