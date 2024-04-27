import { IsBoolean, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { BasicRegisterDto } from "./resgister-auth.dto";
import { NIVEL_EDUCACION } from "src/admin/infra/model/Admin.model";

export class AdminRegisterDTO extends BasicRegisterDto {
    @IsNotEmpty()
    @IsBoolean()
    conocimiento_auxilios: boolean

    @IsEnum(NIVEL_EDUCACION)
    @IsNotEmpty()
    nivel_educacion: string

    @IsString()
    @MinLength(8)
    contrasena: string;

}
