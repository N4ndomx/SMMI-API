import {
  IsArray,
  IsEnum,
  IsInt,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

enum GENERO {
  FEMENINO = 'F',
  MASCULINO = 'M',
}

export class CreateMedicoDto {
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
  @IsInt({ each: true })
  @IsOptional()
  @IsArray()
  id_especialidades?: number[];
}
