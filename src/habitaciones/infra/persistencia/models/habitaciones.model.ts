import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Habitaciones")
export class HabitacionModel {
    @PrimaryGeneratedColumn()
    id_habitacion: number
    @Column('varchar')
    nombre_habitacion: string
    @Column('boolean', { default: false })
    ocupado: boolean
}
