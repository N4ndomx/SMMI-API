import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common"
import { CreateDataSensorDto } from "src/sensores/aplicacion/dto/create-sensore.dto"



@Injectable()
export class EmqxTransfrormPipe implements PipeTransform<any, CreateDataSensorDto> {
    transform(value: any, metadata: ArgumentMetadata): CreateDataSensorDto {
        const sensorData: { id_sensor: number, id_habitacion: number, valor: number } = JSON.parse(value.payload);
        const se = new CreateDataSensorDto()
        se.clientid = value.clientid
        se.event = value.event
        se.node = value.node
        se.peerhost = value.peerhost
        se.qos = value.qos
        se.flags = { dup: value.flags.dup, retain: value.flags.retain }
        se.payload = { id_sensor: sensorData.id_sensor, valor: sensorData.valor, id_habitacion: sensorData.id_habitacion }
        se.topic = value.topic
        // console.log(se.topic)
        return se;
    }
}
