import { IsArray, IsOptional, IsString, MinLength } from "class-validator";
import { BasicRegisterDto } from "./resgister-auth.dto";

export class EnfermeraRegisterDTO extends BasicRegisterDto {
    @IsString()
    @MinLength(5)
    cedula: string;
    @IsString()
    @MinLength(8)
    contrasena: string;
    @IsString({ each: true })
    @IsOptional()
    @IsArray()
    hab_tecnicas: string[]
}
