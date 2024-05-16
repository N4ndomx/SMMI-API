import { IsNumber, IsPositive, IsString } from "class-validator";

export class CreateConfigSensoreDto {
    @IsNumber({ maxDecimalPlaces: 0 })
    @IsPositive()
    max_valor: number
    @IsNumber({ maxDecimalPlaces: 0 })
    @IsPositive()
    min_valor: number
    @IsString()
    topico_sensor: string
    @IsNumber()
    @IsPositive()
    id_habitacion: number;
}
