import { IsString, IsUUID, Matches, ValidateBy } from "class-validator"
import { regxMatricula } from "src/shared/helpers/regx.helper"

export class CreateRecetaDto {
    @IsString()
    @Matches(regxMatricula)
    matricula_medico: string
    @IsUUID()
    id_ingreso: string
    @IsString()
    medicamentos: string
    @IsString()
    indicaciones_addic: string

}
