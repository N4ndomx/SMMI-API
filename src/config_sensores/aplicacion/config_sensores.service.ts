import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateConfigSensoreDto } from './dto/create-config_sensore.dto';
import { UpdateConfigSensoreDto } from './dto/update-config_sensore.dto';
import { HabitacionesService } from 'src/habitaciones/aplicacion/habitaciones.service';
import { ICatalogoSensorRepository, ICatalogoSensorRepositoryToken } from 'src/sensores/domain/interface/catalogo-sensores-interface';
import { IConfigSensorRepository } from '../dominio/interface/config_sensor-repo.interface';

@Injectable()
export class ConfigSensoresService {
  constructor(
    @Inject(IConfigSensorRepository)
    private configRepository: IConfigSensorRepository,
    private habitacionService: HabitacionesService,
    @Inject(ICatalogoSensorRepositoryToken)
    private repoCatalogoSensor: ICatalogoSensorRepository,
  ) { }
  async create(createConfigSensoreDto: CreateConfigSensoreDto) {
    const { id_habitacion, ...data } = createConfigSensoreDto
    const catalogo = await this.repoCatalogoSensor.findByTopico(data.topico_sensor)
    if (!catalogo) {
      throw new BadRequestException('No hay un sensor con ese topico')
    }
    const h = await this.habitacionService.findOne(id_habitacion)
    let res = null
    if (h.config_sensores.length > 0) {
      const config = h.config_sensores.find((value) => value.topico_sensor === data.topico_sensor ? value : null)
      if (config) {
        res = await this.configRepository.save({
          ...config,
          ishabitacion: h,
          max_valor: data.max_valor,
          min_valor: data.min_valor

        })
      } else {
        res = await this.configRepository.save({
          ishabitacion: h,
          ...data
        }
        )

      }
    }

    return res;
  }



  update(id: number, updateConfigSensoreDto: UpdateConfigSensoreDto) {
    return `This action updates a #${id} configSensore`;
  }

  remove(id: number) {
    return `This action removes a #${id} configSensore`;
  }
}
