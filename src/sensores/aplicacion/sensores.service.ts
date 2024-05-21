import { BadRequestException, Inject, Injectable, } from '@nestjs/common';
import { CreateDataSensorDto } from './dto/create-sensore.dto';
import { ISensorDataRepository, ISensorDataRepositoryToken } from '../domain/interface/sensores-interface';
import { SensorData } from '../domain/entities/sensore.entity';
import { ICatalogoSensorRepository, ICatalogoSensorRepositoryToken } from '../domain/interface/catalogo-sensores-interface';
import { CatalogoSensor } from '../domain/entities/catalogo-sensor.entity';
import { DateValue } from 'src/shared/VO/fecha.vo';
import { HabitacionesRepository } from 'src/habitaciones/infra/persistencia/habitaciones.repository';
import { IHabitacionRepository, IHabitacionRepositoryToken } from 'src/habitaciones/domain/interface/habitacion-repository.interface';
import { roundToNearestMinutes, startOfMinute } from 'date-fns';
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
      console.log(newSensor.fecha_registro.value)

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
    const data = await this.findAllCatalogo()
    if (data.length > 0) {
      return "Catalogo de Sensores Cargado..."
    }
    const sensors: CatalogoSensor[] = [
      {

        nombre: "Oxigenacion",
        topico: "/oxig",
        unidad_medida: "SpO2"
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


  async findAllCatalogo() {
    return await this.repoCatalogoSensor.findAll();
  }

  async findAllData() {
    return await this.repoSensor.findAll()
  }


  async findDataBySensor(id_habitacion: number, topico: string, fecha_init?: string, fecha_end?: string) {
    // console.log(fecha_init, fecha_end)
    // const utcDate = new Date(fecha_init);
    // console.log(utcDate)
    // console.log(utcDate.toISOString());

    const sensor = await this.repoCatalogoSensor.findByTopico(topico)
    if (!sensor) {
      throw new BadRequestException("No se encontro sensor con topico: " + topico)
    }
    const datarepo = await this.repoSensor.findDataBySensor(id_habitacion, sensor.topico, fecha_init, fecha_end)
    // let series: any[] = []
    let data: number[] = []
    let categories: any[] = []


    const grouped = {};
    datarepo.forEach((value) => {
      const roundedDate = roundToNearestMinutes(new Date(value.fecha_registro.value), { nearestTo: 5 }); // Redondear al intervalo de 15 minutos mas cercano
      const key = roundedDate.toISOString();
      if (!grouped[key]) {
        categories.push(roundedDate.toLocaleTimeString());
        grouped[key] = { sum: 0, count: 0 }; // Inicializar sum y count para el promedio
      }
      grouped[key].sum += value.valor_registrado; // Sumar el valor al acumulador del grupo
      grouped[key].count++; // Incrementar el contador de lecturas en el grupo
    });

    // Calcular el promedio y asignarlo a cada grupo
    for (const key in grouped) {
      data.push(+(grouped[key].sum / grouped[key].count).toFixed(2))
      grouped[key] = +(grouped[key].sum / grouped[key].count).toFixed(2);
    }
    console.log(grouped)
    return {
      sensor: sensor,
      series: [{
        name: sensor.nombre,
        data: data,
      }],
      categories
    };

  }



}
