import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { IAdminRepository, IAdminRepositoryToken } from '../domain/interfaces/admin-repository.interface';
import { ITransactionRunner } from 'src/shared/interfaces/TransactionFactory/transactions.interface';
import { Admin } from '../domain/entities/admin.entity';
import { OpcionFiedOne, TIPO_BUSQUEDA } from 'src/shared/interfaces/opcion-fiedOne.dto';
import { Errores_Admin } from 'src/shared/helpers/admin.helper';

@Injectable()
export class AdminService {
  constructor(
    @Inject(IAdminRepositoryToken)
    private readonly repository: IAdminRepository
  ) { }
  async create(createAdminDto: CreateAdminDto, transactionRunner?: ITransactionRunner) {
    try {
      const res = await this.repository.save(
        new Admin(
          createAdminDto.nombres,
          createAdminDto.apellidos,
          createAdminDto.direccion,
          createAdminDto.telefono,
          createAdminDto.curp,
          createAdminDto.genero,
          createAdminDto.contrasena,
          createAdminDto.url_img,
          createAdminDto.nivel_educacion,
          createAdminDto.conocimiento_auxilios

        ), transactionRunner
      )
      return res
    } catch (error) {
      throw new Error(error)
    }
  }

  async findAll() {
    return await this.repository.findAll()
  }

  async findOne(termino: OpcionFiedOne) {
    const enfer = await this._getAdminByTermino(termino);
    if (!enfer) {
      throw new NotFoundException(
        {
          mensaje: Errores_Admin.ADMIN_NOT_FOUND,
          razon: `${termino.type} : ${termino.value}`
        }

      );
    }
    return enfer;
  }
  async _getAdminByTermino(termino: OpcionFiedOne, transactionRunner?: ITransactionRunner) {
    let admin = null;
    if (termino.type === TIPO_BUSQUEDA.CURP) {
      admin = await this.repository.findByCURP(termino.value, transactionRunner);
    } else {
      admin = await this.repository.findByOne(termino.value, transactionRunner);
    }
    return admin;
  }

}
