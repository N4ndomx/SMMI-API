import { Module } from '@nestjs/common';
import { AuthService } from './aplicacion/auth.service';
import { AuthController } from './auth.controller';
import { MedicosModule } from 'src/medicos/medicos.module';
import { jwtConstants } from 'src/config/jwt.constant';
import { JwtModule } from '@nestjs/jwt';
import { IMapperToken } from 'src/shared/interfaces/mapper.interface';
import { MedicoMapper } from 'src/medicos/medicos.mapper';
import { EspecialidadesModule } from 'src/especialidades/especialidades.module';
import { SharedModule } from 'src/shared/shared.module';
import { EnfermerasModule } from 'src/enfermeras/enfermeras.module';

@Module({
  imports: [
    SharedModule,
    MedicosModule,
    EnfermerasModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    MedicoMapper,
    {
      provide: IMapperToken,
      useExisting: MedicoMapper,
    },
  ],
})
export class AuthModule { }
