import { Type } from "class-transformer";
import { IsArray, IsNumber, IsPositive, IsString, Validate, ValidateNested } from "class-validator";
import { topicoUnico } from "./validates/topicoValidate.methdo";

export class CreateConfigSensoreDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Validate(topicoUnico)
    @Type(() => ConfigSensorDTO)
    config: ConfigSensorDTO[]
    @IsNumber()
    @IsPositive()
    id_habitacion: number;
}

export class ConfigSensorDTO {
    @IsNumber({ maxDecimalPlaces: 0 })
    @IsPositive()
    max_valor: number
    @IsNumber({ maxDecimalPlaces: 0 })
    @IsPositive()
    min_valor: number
    @IsString()
    topico_sensor: string

}
