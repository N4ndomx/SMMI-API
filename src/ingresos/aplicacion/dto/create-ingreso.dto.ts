import { IsEnum, IsInt, IsString } from "class-validator";
import { GENERO } from "src/shared/helpers/generos.helper";

export class CreateIngresoDto {


    @IsString()
    nombres: string;

    @IsString()
    apellidos: string;

    @IsEnum(GENERO)
    sexo: GENERO;

    @IsInt()
    edad: number;

    @IsString()
    padecimientos: string;

    @IsString()
    alergias: string;

    @IsString()
    causa_ingreso: string;


    @IsString()
    id_enfermera: string

    @IsInt()
    id_especialidad: number;

    @IsInt()
    id_habitacion: number;

}
