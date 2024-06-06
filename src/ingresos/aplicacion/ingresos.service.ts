import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { UpdateIngresoDto } from './dto/update-ingreso.dto';
import { Ingreso } from '../domain/entities/ingreso.entity';
import { EnfermerasService } from 'src/enfermeras/aplicacion/enfermeras.service';
import { HabitacionesService } from 'src/habitaciones/aplicacion/habitaciones.service';
import { IIngresosRepository, IIngresosRepositoryToken } from '../domain/interfaces/ingresos-repository.interface';
import { TIPO_BUSQUEDA } from 'src/shared/interfaces/opcion-fiedOne.dto';
import { EspecialidadesService } from 'src/especialidades/applicacion/especialidades.service';

@Injectable()
export class IngresosService {
  constructor(
    private readonly enfermeraService: EnfermerasService,
    private readonly hbitacionService: HabitacionesService,
    private readonly especialidadService: EspecialidadesService,
    @Inject(IIngresosRepositoryToken)
    private readonly ingresosRepository: IIngresosRepository
  ) { }
  async create(createIngresoDto: CreateIngresoDto) {


    const { id_enfermera, id_especialidad, id_habitacion, ...data } = createIngresoDto
    try {
      const nuevoingreso: Ingreso = new Ingreso(
        data.nombres,
        data.apellidos,
        data.sexo,
        data.edad,
        data.padecimientos,
        data.alergias,
        data.causa_ingreso
      )

      const enf = await this.enfermeraService.findOne({
        type: TIPO_BUSQUEDA.MATRICULA,
        value: id_enfermera
      })

      const habi = await this.hbitacionService.findOne(id_habitacion)
      const esp = await this.especialidadService.findOne(id_especialidad)
      if (habi.ocupado) {
        throw new Error('La habitacion ya esta ocupada ')
      }
      nuevoingreso.asignarEnfermera(enf)
      nuevoingreso.asignarHabitacion(habi)
      nuevoingreso.asinar_Especialidad(esp)

      const res = await this.ingresosRepository.save(nuevoingreso)
      return res

    } catch (error) {
      console.log(error)
      throw new BadRequestException(error.message)
    }


  }

  async findAll() {
    return await this.ingresosRepository.findAll()
  }
  async findAllSinAlta() {
    return await this.ingresosRepository.findAll_No_Alta()
  }
  async asignados_enfermera(matricula: string) {
    try {
      this.enfermeraService.findOne({
        type: TIPO_BUSQUEDA.MATRICULA,
        value: matricula
      })

      return await this.ingresosRepository.find_asignados_enfermera(matricula)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findOne(id: string) {

    const rest = await this.ingresosRepository.findByOne(id)
    if (!rest) {
      throw new BadRequestException('Ingreso no encontrado')
    }
    return rest
  }

  async findByHab(id_hab: number) {
    const rest = await this.ingresosRepository.findByHab(id_hab)
    if (!rest) {
      throw new Error('Ingreso no encontrado')
    }
    return rest
  }



  async dar_alta(id: string) {
    try {

      const ingreso = await this.ingresosRepository.findByOne(id)
      if (ingreso.de_alta) {
        throw new Error('Ya fue dado de alta ')
      }
      ingreso.marcarAlta()
      this.hbitacionService.update(ingreso.id_habitacion.id_habitacion, { ocupado: false })
      await this.ingresosRepository.update(id, ingreso)
      return 'Ingreso dado de alta'
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  remove(id: number) {
    return `This action removes a #${id} ingreso`;
  }

  async findByEspecialidad(id_especialidad: number) {
    const esp = await this.especialidadService.findOne(id_especialidad)
    const ingresos = await this.ingresosRepository.findByEspecialidad(esp.id)
    return ingresos
  }
  async findByNombres(nombres: string, id_especialidad: string) {
    // console.log(nombres)
    return await this.ingresosRepository.findByNombreCompleto(nombres, +id_especialidad)
  }
}
