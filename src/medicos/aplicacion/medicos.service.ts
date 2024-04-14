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

@Injectable()
export class MedicosService {
  constructor(
    @Inject(IMedicoRepositoryToken)
    private readonly medicoRepo: IMedicoRepository,

  ) { }
  async create(createMedicoDto: CreateMedicoDto) {
    try {
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
      console.log(medico);

      await this.medicoRepo.save(medico);
      return medico;
    } catch (error) {
      throw new BadRequestException(error.detail);
    }
  }

  async findOne(termino: OpcionFiedOne) {
    const medico = await this._getMedicoByTermino(termino);
    if (!medico) {
      throw new NotFoundException(
        'Medico ' + termino.type + ' : ' + termino.value + ' No ese encuentra',
      );
    }
    return medico;
  }

  async _getMedicoByTermino(termino: OpcionFiedOne) {
    let medico = null;
    if (termino.type === TIPO_BUSQUEDA.CURP) {
      medico = await this.medicoRepo.findByCURP(termino.value);
    } else {
      medico = await this.medicoRepo.findByOne(termino.value);
    }
    return medico;
  }

  async findAll() {
    return await this.medicoRepo.findAll()
  }
}
