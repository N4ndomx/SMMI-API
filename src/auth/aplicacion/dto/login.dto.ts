import { IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[MDE][0-9][0-9]{4}[A-Z]$/, {
    message: 'La matricula no coincide con la regla ',
  })
  matricula: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  contraseña: string;
}
