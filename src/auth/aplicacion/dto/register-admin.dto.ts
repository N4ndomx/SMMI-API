import { IsString, MinLength } from "class-validator";
import { BasicRegisterDto } from "./resgister-auth.dto";

export class AdminRegisterDTO extends BasicRegisterDto {
    @IsString()
    @MinLength(5)
    cedula: string;

    @IsString()
    @MinLength(8)
    contrasena: string;

}
