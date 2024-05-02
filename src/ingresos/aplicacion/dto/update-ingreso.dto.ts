
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateIngresoDto {

    @IsBoolean()
    de_alta: boolean;
}
