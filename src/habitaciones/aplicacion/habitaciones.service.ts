import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHabitacioneDto } from './dto/create-habitacione.dto';
import { UpdateHabitacioneDto } from './dto/update-habitacione.dto';
import { IHabitacionRepository, IHabitacionRepositoryToken } from '../domain/interface/habitacion-repository.interface';
import { Habitacion } from '../domain/entities/habitacione.entity';

@Injectable()
export class HabitacionesService {
  constructor(
    @Inject(IHabitacionRepositoryToken)
    private repository: IHabitacionRepository
  ) { }
  async create(createHabitacioneDto: CreateHabitacioneDto) {
    const hab = new Habitacion()
    hab.nombre_habitacion = createHabitacioneDto.nombre_habitacion
    const a = await this.repository.save(hab)
    return a
  }

  async findAll() {
    return await this.repository.findAll()
  }

  async findOcupados() {
    return await this.repository.getAllOcupados()
  }
  async findDesocupados() {
    return await this.repository.getAllDesocupados()
  }

  async findOne_ocupado(id: number) {
    const res = await this.repository.findByOne(id)
    if (!res) {
      throw new NotFoundException("Habitacion no encontrada")
    }
    return res
  }

  async update(id: number, updateHabitacioneDto: UpdateHabitacioneDto) {
    await this.findOne_ocupado(id)
    const res = await this.repository.update(id, { ocupado: updateHabitacioneDto.ocupado })
    return res
  }


}
