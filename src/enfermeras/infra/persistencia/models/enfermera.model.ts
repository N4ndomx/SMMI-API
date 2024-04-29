import { EmpleadoModel } from "src/shared/models/empleado.model";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity('Enfermeras')
export class EnfermeraModel {
    @Column('varchar', { length: 7, primary: true, unique: true })
    matriculaEnfermera: string;

    @Column('varchar', { length: 18, unique: true })
    cedula: string;

    @Column('varchar')
    contrasena: string;

    @Column('text', {
        array: true,
        nullable: true
    })
    habilidades_tecnicas: string[];

    @OneToOne(() => EmpleadoModel, { cascade: true, eager: true })
    @JoinColumn({ name: 'idEmpleado' })
    empleado: EmpleadoModel;
}