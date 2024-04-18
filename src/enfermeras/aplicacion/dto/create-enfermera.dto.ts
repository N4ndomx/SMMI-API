import { IsArray, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional, IsString, IsUrl, MinLength } from "class-validator";
import { GENERO } from "src/shared/helpers/generos.helper";

export class CreateEnfermeraDto {
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
    @IsString()
    @MinLength(5)
    cedula: string;
    @IsString()
    @MinLength(8)
    contrasena: string;
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    url_img: string;
    @IsString({ each: true })
    @IsOptional()
    @IsArray()
    hab_tecnicas: string[]
}
