import { BadRequestException, Inject, Injectable, } from '@nestjs/common';
import { CreateDataSensorDto } from './dto/create-sensore.dto';
import { ISensorDataRepository, ISensorDataRepositoryToken } from '../domain/interface/sensores-interface';
import { SensorData } from '../domain/entities/sensore.entity';
import { ICatalogoSensorRepository, ICatalogoSensorRepositoryToken } from '../domain/interface/catalogo-sensores-interface';
import { CatalogoSensor } from '../domain/entities/catalogo-sensor.entity';
import { DateValue } from 'src/shared/VO/fecha.vo';
import { HabitacionesRepository } from 'src/habitaciones/infra/persistencia/habitaciones.repository';
import { IHabitacionRepository, IHabitacionRepositoryToken } from 'src/habitaciones/domain/interface/habitacion-repository.interface';

@Injectable()
export class SensoresDataService {

  constructor(
    @Inject(ISensorDataRepositoryToken)
    private repoSensor: ISensorDataRepository,
    @Inject(ICatalogoSensorRepositoryToken)
    private repoCatalogoSensor: ICatalogoSensorRepository,
    @Inject(IHabitacionRepositoryToken)
    private repositoryHabitacion: IHabitacionRepository

  ) {
  }


  async create(createSensoreDto: CreateDataSensorDto) {
    const payload = createSensoreDto.payload
    try {
      const hab = await this.repositoryHabitacion.findByOne(payload.id_habitacion)
      const sensor = await this.repoCatalogoSensor.findByOne(payload.id_sensor)
      if (sensor === null && hab === null) {
        throw new Error("Habitacion o sensor no localizado")
      }
      const newSensor = new SensorData();
      newSensor.fecha_registro = new DateValue(new Date())
      newSensor.sensor = sensor
      newSensor.habitacion = hab
      newSensor.valor_registrado = createSensoreDto.payload.valor
      console.log(hab)

      const { fecha_registro, ...data } = await this.repoSensor.save(newSensor)
      console.log({
        ...data,
        fecha: fecha_registro.format()
      })
      return { result: "ok", message: "success" }
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error)
    }

  }

  async create_catalogo_sensores() {
    const data = await this.findAll()
    if (data.length > 0) {
      return "Catalogo de Sensores Cargado..."
    }
    const sensors: CatalogoSensor[] = [
      {

        nombre: "Frecuencia Respiratoria",
        topico: "/freqResp",
        unidad_medida: "rpm"
      },
      {
        nombre: "Frecuencia Cardiaca",
        topico: "/freqCard",
        unidad_medida: "bpm"
      },
      {
        nombre: "Presion Arterial Sistolica",
        topico: "/presArtsist",
        unidad_medida: "mmHg"
      },
      {
        nombre: "Presion Arterial Diastolica",
        topico: "/presArtdiast",
        unidad_medida: "mmHg"
      },
      {
        nombre: "Temperatura Corporal",
        topico: "/tempCorp",
        unidad_medida: "°C"
      }

    ]
    const savedSensors: CatalogoSensor[] = [];
    for (const sensor of sensors) {
      const save = await this.repoCatalogoSensor.save(sensor);
      savedSensors.push(save);
    }
    return savedSensors
  }


  async findAll() {
    return await this.repoCatalogoSensor.findAll();
  }

}
