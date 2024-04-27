import { IsBoolean, IsEnum, IsMobilePhone, IsNotEmpty, IsString, IsUrl, MinLength } from "class-validator";
import { NIVEL_EDUCACION } from "src/admin/infra/model/Admin.model";
import { GENERO } from "src/shared/helpers/generos.helper";

export class CreateAdminDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    nombres: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    apellidos: string;
    @IsNotEmpty()
    @IsEnum(GENERO)
    genero: string;
    @IsString()
    @MinLength(1)
    direccion: string;
    @IsString()
    @IsNotEmpty()
    @IsMobilePhone('es-MX')
    @MinLength(10)
    telefono: string;
    @IsString()
    @MinLength(18)
    curp: string;
    @IsNotEmpty()
    @IsBoolean()
    conocimiento_auxilios: boolean
    @IsEnum(NIVEL_EDUCACION)
    @IsNotEmpty()
    nivel_educacion: string
    @IsString()
    @MinLength(8)
    contrasena: string;
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    url_img: string;
}
