import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { SensorDataModel } from './sensor.model';

@Entity("Catalogo_Sensores")
export class CatalogoSensoresModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { unique: true })
    nombre_sensor: string;
    @Column('varchar', { unique: true })
    topico: string;
    @Column('varchar')
    unidad_medida: string;

    @OneToMany(() => SensorDataModel, (model) => model.sensor)
    dataSendor: SensorDataModel[]
}
