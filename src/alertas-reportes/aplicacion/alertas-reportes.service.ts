import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateAlertasReporteDto } from './dto/create-alertas-reporte.dto';
import { UpdateAlertasReporteDto } from './dto/update-alertas-reporte.dto';
import { MqttService } from 'src/mqtt/mqtt.service';
import { IReporteAlertasRepository, IReporteAlertasRepositoryToken } from '../dominio/interface/alertas-reporte-repository.interface';
import { IRecetaRepositoryToken } from 'src/recetas/dominio/interface/receta-repository.interface';
import { ReporteAlerta } from '../dominio/entities/alertas-reporte.entity';
import { IIngresosRepository, IIngresosRepositoryToken } from 'src/ingresos/domain/interfaces/ingresos-repository.interface';
import { ISensorDataRepository, ISensorDataRepositoryToken } from 'src/sensores/domain/interface/sensores-interface';
import { Ingreso } from 'src/ingresos/domain/entities/ingreso.entity';
import { Session } from 'inspector';
import { SensorData } from 'src/sensores/domain/entities/sensore.entity';
import { ConfigSensorModel } from 'src/config_sensores/infra/persistencia/models/config_sensores.model';
interface EmergencyRecord {
  startTime: number;
  endTime?: number;
  timeoutId?: NodeJS.Timeout;
}
@Injectable()
export class AlertasReportesService {
  private logger = new Logger("AlertasReportesService")

  private emergencies: Map<number, EmergencyRecord> = new Map<number, EmergencyRecord>();

  constructor(
    private mqttservice: MqttService,
    @Inject(IReporteAlertasRepositoryToken)
    private repository: IReporteAlertasRepository,
    @Inject(ISensorDataRepositoryToken)
    private repoSensor: ISensorDataRepository,
    @Inject(IIngresosRepositoryToken)
    private readonly ingresosRepository: IIngresosRepository
  ) {
    this.subEmergencias()
    // this.startEmergencyLogger();

  }

  private startEmergencyLogger() {
    const logEmergencies = () => {
      console.log(this.emergencies);
      setTimeout(logEmergencies, 5000); // Schedule the next log in 200ms
    };
    logEmergencies(); // Start the logging
  }

  private subEmergencias() {
    this.mqttservice.mqtt.subscribe("SMMI/+/emergencia")
    this.mqttservice.mqtt.on('message', (topico, message) => {
      // console.log(topico)
      const sensorData: { id_habitacion: number, sensor: string, topico: string, valor: number } = JSON.parse(message.toString());
      this.handleMessage(sensorData.id_habitacion)
      // console.log(sensorData)
    })

  }

  private handleMessage(room: number) {
    const currentTime = Date.now();

    if (!this.emergencies.has(room)) {
      // Nueva emergencia, guardar la hora de inicio
      console.log(`Room ${room}: Emergency active`);
      this.emergencies.set(room, { startTime: currentTime });

    } else {
      // Update the end time
      const record = this.emergencies.get(room);
      record.endTime = currentTime;
      if (record.timeoutId) {
        // Clear the previous timeout if a new message is received within 2 minutes
        clearTimeout(record.timeoutId);
      }
      this.emergencies.set(room, record);
    }
    // Set a timeout to clear the emergency record after 2 minutes of inactivity
    const timeoutId = setTimeout(() => {
      const record = this.emergencies.get(room);

      console.log("Emergencia duro " + this.getEmergencyDuration(room) + " segundos")
      this.logger.log(`Emergency record for room ${room} almecenado para reportar.`)
      this.createReportAlert({
        id_habi: room,
        duracion_emergencia: this.getEmergencyDuration(room),
        fecha_registro: new Date(),
        startTime_emergencia: record.startTime,
        endTime_enmergencia: record.endTime
      })
      this.emergencies.delete(room);
      console.log(`Emergency record for room ${room} almecenado para reportar.`);

    }, 1 * 60 * 1000);

    const record = this.emergencies.get(room);
    if (record) {
      record.timeoutId = timeoutId;
      this.emergencies.set(room, record);
    }


  }

  private getEmergencyDuration(room: number): number {
    const record = this.emergencies.get(room);
    // console.log(record)
    if (!record) {
      throw new Error(`No emergency record for room ${room}`);
    }

    const startTime = record.startTime;
    const endTime = record.endTime || Date.now();
    const duration_sg = (endTime - startTime) / 1000; // Convert milliseconds to seconds
    console.log(new Date(startTime).toLocaleString())
    return duration_sg;
  }

  async createReportAlert(createAlertasReporteDto: CreateAlertasReporteDto) {
    const start = new Date(createAlertasReporteDto.startTime_emergencia)
    const end = new Date(createAlertasReporteDto.endTime_enmergencia)
    const ingreso = await this.ingresosRepository.findByHab(createAlertasReporteDto.id_habi)
    const config_alarma = ingreso.id_habitacion.config_sensores

    const findOpc = {
      id_habitacion: ingreso.id_habitacion.id_habitacion,
      fecha_init: start.getUTCFullYear() + "-" + (start.getUTCMonth() + 1) + "-" + start.getUTCDate(),
      fecha_end: end.getUTCFullYear() + "-" + (end.getUTCMonth() + 1) + "-" + end.getUTCDate(),
      hora_init: start.toISOString().slice(11, 19),
      hora_end: end.toISOString().slice(11, 19)
    }
    const data = await this.repoSensor.findDataBySensor(findOpc)
    const grupos = this.agruparByTopico(data)
    const reporte = this.reporteSensoresByTopicos(config_alarma, grupos)




    const reporteAlerta = new ReporteAlerta()
    reporteAlerta.duracion_emergencia_sg = createAlertasReporteDto.duracion_emergencia
    reporteAlerta.fecha_registro = createAlertasReporteDto.fecha_registro
    reporteAlerta.Ingreso = ingreso
    reporteAlerta.sensores_reporte = JSON.stringify(reporte)

    console.log(reporte)
    // console.log(grupos)
    console.log(start.toLocaleString(), end.toLocaleString())
    console.log(findOpc)
    return await this.repository.save(reporteAlerta)
  }
  private agruparByTopico(data: SensorData[]) {
    let grupos: Map<string, { promedio: number, contador: number }> = new Map()
    data.forEach((ob) => {
      if (!grupos.has(ob.sensor.topico)) {
        grupos.set(ob.sensor.topico, { promedio: ob.valor_registrado, contador: 1 })
      } else {
        const r = grupos.get(ob.sensor.topico)
        r.contador = r.contador + 1
        r.promedio = r.promedio + ob.valor_registrado

        grupos.set(ob.sensor.topico, r)
      }
    })
    grupos.forEach((value, key) => {
      value.promedio = value.promedio / value.contador
      grupos.set(key, value)
    })
    return Array.from(grupos, ([topico, value]) => ({ topico, ...value }));
  }

  private reporteSensoresByTopicos(config_alarma: ConfigSensorModel[], grupos: {
    promedio: number;
    contador: number;
    topico: string;
  }[]) {

    const r = config_alarma.flatMap((config) => {
      let response_sensor_afect: { promedio: number, contador: number, sensor_afectado: boolean }[] = [];
      grupos.forEach((grupo_data) => {
        if (grupo_data.topico === config.topico_sensor) {
          response_sensor_afect.push({
            ...grupo_data,
            sensor_afectado: grupo_data.promedio > config.max_valor || grupo_data.promedio < config.min_valor,
          });
        }
      });
      return response_sensor_afect;
    });

    return r

  }

  async findAllCompletadosByIngreso(id_ingreos: string) {
    return await this.repository.findAllCompletosByIngreso(id_ingreos)
  }

  async findSinCompletarByIngreso(id_ingreos: string) {
    return await this.repository.findAllSinCompletarByIngreso(id_ingreos)
  }

  async findAllbyIngreso(id_ingreos: string) {
    return await this.repository.findAllByIngreso(id_ingreos)
  }

  async update(id: string, updateAlertasReporteDto: UpdateAlertasReporteDto) {
    const reporteAlerta = await this.repository.findByOne(id)
    if (!reporteAlerta) {
      throw new BadRequestException("Reporte no existe")
    }

    reporteAlerta.acciones_tomadas = updateAlertasReporteDto.acciones_tomadas
    reporteAlerta.evento_critico = updateAlertasReporteDto.evento_critico
    reporteAlerta.completado = !reporteAlerta.completado ? true : reporteAlerta.completado

    await this.repository.update(id, reporteAlerta)

    return {
      status: "ok"
    };
  }


}
