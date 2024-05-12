import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { CatalogoSensoresModel } from './catalogo-sensores.model';
import { HabitacionModel } from 'src/habitaciones/infra/persistencia/models/habitaciones.model';

@Entity("Data_Sensors")
export class SensorDataModel {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    fecha_registro: Date

    @Column('float')
    valor_registrado: number;

    @ManyToOne(() => CatalogoSensoresModel, (model) => model.dataSendor, { eager: true })
    @JoinColumn({ name: 'id_catalogo_sensor' })
    topico_sensor: CatalogoSensoresModel;

    @ManyToOne(() => HabitacionModel, (model) => model.id_habitacion, { eager: true })
    @JoinColumn({ name: 'id_habitacion' })
    habitacion: HabitacionModel
}
