import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { Medico } from '../domain/entities/medico.entity';
import {
  IMedicoRepository,
  IMedicoRepositoryToken,
} from '../domain/interfaces/medico-repository.interface';
import {
  OpcionFiedOne,
  TIPO_BUSQUEDA,
} from 'src/auth/aplicacion/dto/opcion-fiedOne.dto';
import { Errores_Medicos } from 'src/shared/helpers/medicos.helper';
import { ITransactionRunner } from 'src/shared/interfaces/TransactionFactory/transactions.interface';
import { EspecialidadesService } from 'src/especialidades/applicacion/especialidades.service';
import { Especialidad } from 'src/especialidades/domain/entities/especialidade.entity';

@Injectable()
export class MedicosService {
  constructor(
    private readonly especialidadService: EspecialidadesService,
    @Inject(IMedicoRepositoryToken)
    private readonly medicoRepo: IMedicoRepository,
  ) { }
  async create(createMedicoDto: CreateMedicoDto, transactionRunner?: ITransactionRunner) {

    let medico = new Medico(
      createMedicoDto.nombres,
      createMedicoDto.apellidos,
      createMedicoDto.direccion,
      createMedicoDto.telefono,
      createMedicoDto.curp,
      createMedicoDto.cedula,
      createMedicoDto.contrasena,
      createMedicoDto.genero,
    );
    await this.medicoRepo.save(medico, transactionRunner);

    if (createMedicoDto.id_especialidades) {

      const espPromesas: Promise<Especialidad>[] = createMedicoDto.id_especialidades.map(async id => {
        const restEsp = await this.especialidadService.findOne(id);
        await this.especialidadService.asignarEspecialidad(medico.matriculaMedico, id, transactionRunner)
        return restEsp;
      });

      // Ahora, para esperar a que todas las promesas se resuelvan y obtener los resultados:
      const esp: Especialidad[] = await Promise.all(espPromesas);
      medico.asignarEspecialidades(esp)
    } else {
      medico.asignarEspecialidades([])

    }

    return medico;


  }

  async findOne(termino: OpcionFiedOne, transactionRunner?: ITransactionRunner) {
    const medico = await this._getMedicoByTermino(termino, transactionRunner);
    if (!medico) {
      throw new NotFoundException(
        {
          mensaje: Errores_Medicos.MEDICO_NOT_FOUND,
          razon: `${termino.type} : ${termino.value}`
        }

      );
    }
    return medico;
  }

  async _getMedicoByTermino(termino: OpcionFiedOne, transactionRunner?: ITransactionRunner) {
    let medico = null;
    if (termino.type === TIPO_BUSQUEDA.CURP) {
      medico = await this.medicoRepo.findByCURP(termino.value, transactionRunner);
    } else {
      medico = await this.medicoRepo.findByOne(termino.value, transactionRunner);
    }
    return medico;
  }

  async findAll() {
    return await this.medicoRepo.findAll();
  }



}
