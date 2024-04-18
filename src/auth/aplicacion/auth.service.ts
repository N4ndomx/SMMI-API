import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MedicoRegisterDTO } from './dto/registe-medico.dto';
import { MedicosService } from 'src/medicos/aplicacion/medicos.service';
import * as bcrypt from 'bcrypt';
import { TIPO_BUSQUEDA } from '../../shared/interfaces/opcion-fiedOne.dto';
import { Medico } from 'src/medicos/domain/entities/medico.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login.dto';
import { ITransactionRunner } from 'src/shared/interfaces/TransactionFactory/transactions.interface';
import { DbTransactionFactory } from 'src/shared/interfaces/TransactionFactory/transaction.factory';
import { EspecialidadesService } from 'src/especialidades/applicacion/especialidades.service';
import { Errores_MEDICO } from 'src/shared/helpers/medicos.helper';
import { EnfermerasService } from 'src/enfermeras/aplicacion/enfermeras.service';
import { EnfermeraRegisterDTO } from './dto/register-enfermera.dto';
import { AdminRegisterDTO } from './dto/register-admin.dto';
import { Enfermera } from 'src/enfermeras/domain/entities/enfermera.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly transactionFactory: DbTransactionFactory,
    private readonly medicoService: MedicosService,
    private readonly enfermeraService: EnfermerasService,

    private readonly jwtService: JwtService,
  ) { }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
  private async generateToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
  private async loginMedico(matricula: string, contrasena: string) {
    const user: Medico = await this.medicoService.findOne({
      type: TIPO_BUSQUEDA.MATRICULA,
      value: matricula,
    });
    const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException('Matricula/Password Invalida');
    }
    return {
      matricula,
      id: user.id
    }
  }
  private async loginEnfermera(matricula: string, contrasena: string) {
    const user: Enfermera = await this.enfermeraService.findOne({
      type: TIPO_BUSQUEDA.MATRICULA,

      value: matricula
    });

    const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
    if (!user || !isPasswordValid) {
      throw new UnauthorizedException('Matricula/Password Invalida');
    }
    return {
      matricula,
      id: user.id
    }
  }
  private async loginAdmin(matricula: string, contrasena: string) { }

  async registerMedico({ contrasena, curp, ...data }: MedicoRegisterDTO) {

    const transactionRunner: ITransactionRunner = await this.transactionFactory.createTransaction();
    try {

      await transactionRunner.startTransaction();

      const medico = await this.medicoService._getMedicoByTermino({
        type: TIPO_BUSQUEDA.CURP,
        value: curp,
      }, transactionRunner);
      if (medico) {
        throw new BadRequestException(
          Errores_MEDICO.MEDICO_ALREADY_EXISTS,
        );
      }

      const hashedPassword = await this.hashPassword(contrasena);
      const { matriculaMedico, id } = await this.medicoService.create({
        curp,
        ...data,
        contrasena: hashedPassword
      },
        transactionRunner
      )


      await transactionRunner.commitTransaction();
      return {
        matriculaMedico,
        id_empleado: id,
        message: 'User created successfully',
      };
    } catch (error) {
      await transactionRunner.rollbackTransaction();
      console.log(error)
      throw new BadRequestException(error.detail ?? error.message);
    } finally {
      await transactionRunner.releaseTransaction();
    }

  }
  async registerEnfermera({ contrasena, curp, ...data }: EnfermeraRegisterDTO) {
    const transactionRunner: ITransactionRunner = await this.transactionFactory.createTransaction();
    try {

      await transactionRunner.startTransaction();

      const medico = await this.enfermeraService._getMedicoByTermino({ type: TIPO_BUSQUEDA.CURP, value: curp }, transactionRunner)
      if (medico) {
        throw new BadRequestException(
          Errores_MEDICO.MEDICO_ALREADY_EXISTS,
        );
      }

      const hashedPassword = await this.hashPassword(contrasena);
      const { matricula, id } = await this.enfermeraService.create({
        curp,
        ...data,
        contrasena: hashedPassword
      },
        transactionRunner
      )


      await transactionRunner.commitTransaction();
      return {
        matricula,
        id_empleado: id,
        message: 'Enfermera created successfully',
      };
    } catch (error) {
      await transactionRunner.rollbackTransaction();
      console.log(error)
      throw new BadRequestException(error.detail ?? error.message);
    } finally {
      await transactionRunner.releaseTransaction();
    }
  }
  async registerAdmin({ contrasena, curp, ...data }: AdminRegisterDTO) {

  }
  async login({ matricula, contraseña }: LoginDTO) {
    let res: any
    if (matricula.startsWith("M")) {
      res = await this.loginMedico(matricula, contraseña)
    } else if (matricula.startsWith("E")) {
      res = await this.loginEnfermera(matricula, contraseña)
    } else {
      //TODO: Falta login y registro de admin
      res = await this.loginAdmin(matricula, contraseña)
    }

    console.log(res)

    const token = await this.generateToken(res);

    return {
      token,
      matricula,
      message: 'Sesion_Activa',
    };
  }
}
