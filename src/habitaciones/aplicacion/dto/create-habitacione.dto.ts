import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateHabitacioneDto {
    @IsNotEmpty()
    @IsString()
    nombre_habitacion: string;

}
