import { Enfermera } from 'src/enfermeras/domain/entities/enfermera.entity';
import { Especialidad } from 'src/especialidades/domain/entities/especialidade.entity';
import { Habitacion } from 'src/habitaciones/domain/entities/habitacione.entity';
import { v4 as uuidv4 } from 'uuid';

export class Ingreso {
    id_ingreso: string;
    fecha_ingreso: Date;
    hora_ingreso: string;
    nombres: string;
    apellidos: string;
    sexo: string;
    edad: number;
    padecimientos: string;
    alergias: string;
    causa_ingreso: string;
    de_alta: boolean;
    fecha_actualizacion: Date;
    id_enfermera: Enfermera;
    id_especialidad: Especialidad;
    id_habitacion: Habitacion;

    constructor(
        nombres: string,
        apellidos: string,
        sexo: string,
        edad: number,
        padecimientos: string,
        alergias: string,
        causa_ingreso: string,
        id_especialidad?: Especialidad,
        id_habitacion?: Habitacion,
        id_ingreso?: string,
        fecha_actualizacion?: Date,
        fecha_ingreso?: Date,
        hora_ingreso?: string

    ) {
        this.id_ingreso = id_ingreso ?? uuidv4(); // Genera un ID único para el ingreso
        this.fecha_ingreso = fecha_ingreso ?? new Date();
        this.hora_ingreso = hora_ingreso ??
            new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.sexo = sexo;
        this.edad = edad;
        this.padecimientos = padecimientos;
        this.alergias = alergias;
        this.causa_ingreso = causa_ingreso;
        this.de_alta = false // Por defecto, el paciente no está dado de alta al ingresar
        this.id_especialidad = id_especialidad
        this.id_habitacion = id_habitacion;
        this.fecha_actualizacion = fecha_actualizacion
    }

    marcarAlta() {
        this.de_alta = true;
        this.id_habitacion.desocupar_habitacion()
    }
    // Método para calcular la duración de la estancia del paciente en el hospital
    calcularDuracionEstancia(): number {
        const fechaActual = new Date();
        const diffTiempo = Math.abs(fechaActual.getTime() - this.fecha_ingreso.getTime());
        return Math.ceil(diffTiempo / (1000 * 60 * 60 * 24)); // Retorna la duración en días, redondeando hacia arriba
    }
    asinar_Especialidad(id_especialidad: Especialidad) {
        this.id_especialidad = id_especialidad

    }

    // Método para asignar una nueva enfermera al paciente
    asignarEnfermera(idEnfermera: Enfermera) {
        this.id_enfermera = idEnfermera;
    }

    // Método para cambiar la habitación del paciente
    asignarHabitacion(idHabitacion: Habitacion) {
        this.id_habitacion = idHabitacion;
        this.id_habitacion.ocupar_habitacion()
    }

    // Método para notificar al paciente sobre su estado de alta
    notificarAlta() {
        // Lógica para enviar una notificación al paciente sobre su alta médica
        console.log(`Estimado ${this.nombres} ${this.apellidos}, le informamos que ha sido dado de alta.`);
    }

}
