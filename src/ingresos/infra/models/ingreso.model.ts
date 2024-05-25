import { ReporteAlertaModel } from "src/alertas-reportes/infra/model/reporte-alerta.model";
import { EnfermeraModel } from "src/enfermeras/infra/persistencia/models/enfermera.model";
import { EspecialidadModel } from "src/especialidades/infra/persistencia/models/especialidades.model";
import { HabitacionModel } from "src/habitaciones/infra/persistencia/models/habitaciones.model";
import { CatalogoSensoresModel } from "src/sensores/infra/persistencia/models/catalogo-sensores.model";
import { GENERO } from "src/shared/helpers/generos.helper";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Ingresos')
export class IngresoModel {
    @PrimaryGeneratedColumn('uuid')
    id_ingreso: string;

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    fecha_ingreso: Date;

    @Column({ type: 'time', default: () => 'CURRENT_TIME' })
    hora_ingreso: string;

    @Column('varchar')
    nombres: string;

    @Column('varchar')
    apellidos: string;

    @Column('enum', { enum: GENERO })
    sexo: string;

    @Column('int')
    edad: number;

    @Column('text')
    padecimientos: string;

    @Column('text')
    alergias: string;

    @Column('text')
    causa_ingreso: string;

    @Column({ type: 'boolean' })
    de_alta: boolean;

    @UpdateDateColumn({ type: 'timestamptz', })
    fecha_actualizacion: Date;

    @ManyToOne(type => EnfermeraModel, { eager: true })
    id_enfermera: EnfermeraModel;

    @ManyToOne(type => EspecialidadModel, { eager: true })
    id_especialidad: EspecialidadModel;

    @ManyToOne(type => HabitacionModel, { eager: true, cascade: true, onUpdate: "CASCADE" })
    habitacion: HabitacionModel;

    @OneToMany(() => ReporteAlertaModel, (m) => m.ingreso)
    reportes_alerta: ReporteAlertaModel
}
