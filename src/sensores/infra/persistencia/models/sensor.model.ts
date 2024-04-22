import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CatalogoSensoresModel } from './catalogo-sensores.model';

@Entity("Data_Sensors")
export class SensorDataModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    fecha_registro: Date;

    @Column('float')
    valor_registrado: number;

    @ManyToOne(() => CatalogoSensoresModel, (model) => model.dataSendor, { eager: true })
    topico_sensor: CatalogoSensoresModel;
}
