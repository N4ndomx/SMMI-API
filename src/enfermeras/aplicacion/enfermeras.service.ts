import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnfermeraDto } from './dto/create-enfermera.dto';
import { UpdateEnfermeraDto } from './dto/update-enfermera.dto';
import { IEnfermeraRepository, IEnfermeraRepositoryToken } from '../domain/interface/enfermera-repository.interface';
import { ITransactionRunner } from 'src/shared/interfaces/TransactionFactory/transactions.interface';
import { Enfermera } from '../domain/entities/enfermera.entity';
import { OpcionFiedOne, TIPO_BUSQUEDA } from 'src/shared/interfaces/opcion-fiedOne.dto';
import { Errores_ENFERMERA } from 'src/shared/helpers/enfermeras.helper';

@Injectable()
export class EnfermerasService {
  medicoRepo: any;
  constructor(
    @Inject(IEnfermeraRepositoryToken)
    private readonly repository: IEnfermeraRepository
  ) { }
  async create(createEnfermeraDto: CreateEnfermeraDto, transactionRunner?: ITransactionRunner) {
    try {

      const res = await this.repository.save(new Enfermera(
        createEnfermeraDto.nombres,
        createEnfermeraDto.apellidos,
        createEnfermeraDto.direccion,
        createEnfermeraDto.telefono,
        createEnfermeraDto.curp,
        createEnfermeraDto.genero,
        createEnfermeraDto.cedula,
        createEnfermeraDto.contrasena,
        createEnfermeraDto.url_img,
        createEnfermeraDto.hab_tecnicas

      ), transactionRunner)
      return res
    } catch (error) {
      throw new Error(error.detail)
    }
  }

  findAll() {
    return `This action returns all enfermeras`;
  }

  async findOne(termino: OpcionFiedOne,) {
    const enfer = await this._getMedicoByTermino(termino);
    if (!enfer) {
      throw new NotFoundException(
        {
          mensaje: Errores_ENFERMERA.ENFERMERA_NOT_FOUND,
          razon: `${termino.type} : ${termino.value}`
        }

      );
    }
    return enfer;
  }

  update(id: number, updateEnfermeraDto: UpdateEnfermeraDto) {
    return `This action updates a #${id} enfermera`;
  }

  remove(id: number) {
    return `This action removes a #${id} enfermera`;
  }
  async _getMedicoByTermino(termino: OpcionFiedOne, transactionRunner?: ITransactionRunner) {
    let enfer = null;
    if (termino.type === TIPO_BUSQUEDA.CURP) {
      enfer = await this.repository.findByCURP(termino.value, transactionRunner);
    } else {
      enfer = await this.repository.findByOne(termino.value, transactionRunner);
    }
    return enfer;
  }
}
