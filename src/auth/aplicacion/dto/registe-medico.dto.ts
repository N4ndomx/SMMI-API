import { IsArray, IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import { BasicRegisterDto } from './resgister-auth.dto';

export class MedicoRegisterDTO extends BasicRegisterDto {
  @IsString()
  @MinLength(5)
  cedula: string;

  @IsString()
  @MinLength(8)
  contrasena: string;
  @IsInt({ each: true })
  @IsArray()
  @IsOptional()
  id_especialidades?: number[];
}
