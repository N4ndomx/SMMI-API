import {
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { GENERO } from 'src/shared/helpers/generos.helper';



export abstract class BasicRegisterDto {
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
  @IsString()
  @MinLength(8)
  contrasena: string;
  @IsString()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  url_img: string;
}
