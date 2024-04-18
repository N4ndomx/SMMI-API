import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
import {
    IEspecialidadRepository,
    IEspecialidadRepositoryToken,
} from '../domain/interfaces/especialidad-reposirory.interface';
import { Especialidad } from '../domain/entities/especialidade.entity';
import { ITransactionRunner } from 'src/shared/interfaces/TransactionFactory/transactions.interface';
import { MedicoEspecialidadRepository } from '../infra/persistencia/medico-especialidad.repository';

@Injectable()
export class EspecialidadesService {
    constructor(
        private medico_especialidad: MedicoEspecialidadRepository,
        @Inject(IEspecialidadRepositoryToken)
        private readonly especialidadRepo: IEspecialidadRepository,
    ) { }
    async create({ descripcion, nombre }: CreateEspecialidadeDto, transactionRunner?: ITransactionRunner) {
        try {
            const data = await this.especialidadRepo.save({
                descripcion: descripcion,
                nombre: nombre,
            }, transactionRunner);
            return data;
        } catch (error) {
            throw new BadRequestException(error.detail);
        }
    }

    async findAll() {
        return await this.especialidadRepo.findAll();
    }

    async findOne(idu: number, transactionRunner?: ITransactionRunner) {
        const esp: Especialidad =
            await this.especialidadRepo.findByOne(idu, transactionRunner);
        if (!esp) {
            throw new NotFoundException(`Especialidad con id : ${idu} no encontrada`);
        }
        return esp;
    }


    remove(id: number) {
        return `This action removes a #${id} especialidade`;
    }


    async asignarEspecialidad(matricula_medico: string, especialidad_id: number, transactionRunner?: ITransactionRunner) {
        await this.medico_especialidad.save(matricula_medico, especialidad_id, transactionRunner)
    }
}
