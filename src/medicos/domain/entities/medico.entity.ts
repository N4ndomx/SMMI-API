import { Empleado } from 'src/shared/entities/empleado.entity';

export class Medico extends Empleado {
  matriculaMedico: string;
  cedula: string;
  contrasena: string;

  constructor(
    nombres: string,
    apellidos: string,
    direccion: string,
    telefono: string,
    curp: string,
    cedula: string,
    contrasena: string,
    genero: string,
    matricula?: string,
    id?: string,
  ) {
    super(nombres, apellidos, direccion, telefono, curp, genero, id);
    this.cedula = cedula;
    this.contrasena = contrasena;

    this.matriculaMedico = matricula ?? this.generatMatricula(cedula, curp);
  }

  private generatMatricula(cedula: string, curp: string): string {
    return 'M' + cedula.substring(0, 5) + curp.substring(0, 1);
  }
}
