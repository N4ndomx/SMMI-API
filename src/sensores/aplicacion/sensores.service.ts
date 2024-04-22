import { BadRequestException, HttpCode, Inject, Injectable, Res } from '@nestjs/common';
import { CreateDataSensorDto } from './dto/create-sensore.dto';
import { UpdateSensoreDto } from './dto/update-sensore.dto';
import { ISensorDataRepository, ISensorDataRepositoryToken } from '../domain/interface/sensores-interface';
import { SensorData } from '../domain/entities/sensore.entity';
import { ICatalogoSensorRepository, ICatalogoSensorRepositoryToken } from '../domain/interface/catalogo-sensores-interface';
import { CatalogoSensor } from '../domain/entities/catalogo-sensor.entity';
import { DateValue } from 'src/shared/VO/fecha.vo';

@Injectable()
export class SensoresDataService {

  constructor(
    @Inject(ISensorDataRepositoryToken)
    private repoSensor: ISensorDataRepository,
    @Inject(ICatalogoSensorRepositoryToken)
    private repoCatalogoSensor: ICatalogoSensorRepository,

  ) {
  }


  async create(createSensoreDto: CreateDataSensorDto) {
    try {
      const sensor = await this.repoCatalogoSensor.findByOne(createSensoreDto.payload.id_sensor)
      if (!sensor) {
        throw new BadRequestException()
      }
      const newSensor = new SensorData();
      newSensor.fecha_registro = new DateValue(new Date())
      newSensor.sensor = sensor
      newSensor.valor_registrado = createSensoreDto.payload.valor

      const { fecha_registro, ...data } = await this.repoSensor.save(newSensor)
      // console.log({
      //   ...data,
      //   fecha: fecha_registro.format()
      // })
      return { "result": "ok", "message": "success" }
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error.detail)
    }

  }

  async create_catalogo_sensores() {
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
