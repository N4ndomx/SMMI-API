import { PartialType } from '@nestjs/mapped-types';
import { CreateHabitacioneDto } from './create-habitacione.dto';
import { IsBoolean } from 'class-validator';

export class UpdateHabitacioneDto extends PartialType(CreateHabitacioneDto) {
    @IsBoolean()
    ocupado: boolean
}
