import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './aplicacion/auth.service';
import { LoginDTO } from './aplicacion/dto/login.dto';
import { MedicoRegisterDTO } from './aplicacion/dto/registe-medico.dto';
import { EnfermeraRegisterDTO } from './aplicacion/dto/register-enfermera.dto';
import { AdminRegisterDTO } from './aplicacion/dto/register-admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register/medico')
  registerMedico(@Body() medicoRegisterDto: MedicoRegisterDTO) {
    return this.authService.registerMedico(medicoRegisterDto);
  }
  @Post('register/enfermera')
  registerEnfermera(@Body() enfermeraRegisterDto: EnfermeraRegisterDTO) {
    return this.authService.registerEnfermera(enfermeraRegisterDto);
  }
  @Post('register/admin')
  registerAdmin(@Body() adminRegisterDto: AdminRegisterDTO) {
    return this.authService.registerAdmin(adminRegisterDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(
    @Body()
    loginDto: LoginDTO,
  ) {
    return this.authService.login(loginDto);
  }
}
