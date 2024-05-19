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

        this.mqtt.subscribe('/from-device',);

        this.mqtt.on('message', function (topic, message) {
            console.log('New message received!');
            console.log(message.toString());
        });
    }


    notificacion_config(id_habitacion: number) {
        this.mqtt.publish(`SMMI/Habitacion${id_habitacion}/notificacion_config`, 'true')
    }
}