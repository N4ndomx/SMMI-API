import { EmpleadoModel } from "src/shared/models/empleado.model";
import { Column, Entity, JoinColumn, OneToOne, Table } from "typeorm";

export enum NIVEL_EDUCACION {
    BASIC = "BASICA",
    MEDIA = "MEDIA SUPERIOR",
    SUPERIOR = "SUPERIOR"
}
@Entity('Administrador')
export class AdminModel {
    @Column('varchar', { length: 7, primary: true, unique: true })
    matriculaAdmin: string;

    @Column('varchar')
    contrasena: string;

    @Column('bool')
    conocimiento_auxilios: boolean

    @Column('enum', { enum: NIVEL_EDUCACION })
    nivel_educacion: string


    @OneToOne(() => EmpleadoModel, { cascade: true, eager: true })
    @JoinColumn({ name: 'idEmpleado' })
    empleado: EmpleadoModel;
}