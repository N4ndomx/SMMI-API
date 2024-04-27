import { IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[MAE][0-9]{5}[A-Z]$/, {
    message: 'La matricula no coincide con la regla ',
  })
  matricula: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  contraseña: string;
}
