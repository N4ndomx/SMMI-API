import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateConfigSensoreDto } from './dto/create-config_sensore.dto';
import { UpdateConfigSensoreDto } from './dto/update-config_sensore.dto';
import { HabitacionesService } from 'src/habitaciones/aplicacion/habitaciones.service';
import { ICatalogoSensorRepository, ICatalogoSensorRepositoryToken } from 'src/sensores/domain/interface/catalogo-sensores-interface';
import { IConfigSensorRepository } from '../dominio/interface/config_sensor-repo.interface';
import { MqttService } from 'src/mqtt/mqtt.service';

@Injectable()
export class ConfigSensoresService {
  constructor(
    private mqttservice: MqttService,
    @Inject(IConfigSensorRepository)
    private configRepository: IConfigSensorRepository,
    private habitacionService: HabitacionesService,
    @Inject(ICatalogoSensorRepositoryToken)
    private repoCatalogoSensor: ICatalogoSensorRepository,
  ) { }
  async create(createConfigSensoreDto: CreateConfigSensoreDto) {
    const { id_habitacion, ...data } = createConfigSensoreDto
    for (let confg of data.config) {
      const catalogo = await this.repoCatalogoSensor.findByTopico(confg.topico_sensor)
      if (!catalogo) {
        throw new BadRequestException('No hay un sensor con ese topico :' + confg.topico_sensor)
      }

    }
    const habitacion = await this.habitacionService.findOne(id_habitacion)
    let res = []
    let rest = null
    for (let cfg of data.config) {
      if (habitacion.config_sensores.length > 0) {
        const config = habitacion.config_sensores.find((value) => value.topico_sensor === cfg.topico_sensor ? value : null)
        if (config) {
          rest = await this.configRepository.save({
            ...config,
            ishabitacion: habitacion,
            max_valor: cfg.max_valor,
            min_valor: cfg.min_valor

          })
        }

      } else {
        rest = await this.configRepository.save({
          ishabitacion: habitacion,
          ...cfg
        }
        )

      }
      res.push(rest)
    }

    this.mqttservice.notificacion_config(habitacion.id_habitacion)
    return res;
  }

  async finByHabitacion(id_habitacion: number) {
    return await this.configRepository.findByHabitacion(id_habitacion)
  }

  update(id: number, updateConfigSensoreDto: UpdateConfigSensoreDto) {
    return `This action updates a #${id} configSensore`;
  }

  remove(id: number) {
    return `This action removes a #${id} configSensore`;
  }
}
