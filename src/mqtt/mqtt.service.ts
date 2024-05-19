import { Injectable, Logger } from '@nestjs/common';
import { MqttClient, connect } from 'mqtt';

@Injectable()
export class MqttService {
    public readonly mqtt: MqttClient;
    private logger = new Logger('MqttService')
    constructor() {
        this.mqtt = connect(process.env.connectMQTTUrl, {
            host: "localhost",
            protocol: 'mqtt',
            clientId: process.env.clientId || null,
            clean: true,
            username: process.env.usernameMQTT,
            password: process.env.passwordMQTT,
        });

        this.mqtt.on('connect', () => {
            this.logger.log('Connected to MQTT server');
        });

    }


    notificacion_config(id_habitacion: number) {
        this.mqtt.publish(`SMMI/Habitacion${id_habitacion}/notificacion_config`, 'true')
    }
}