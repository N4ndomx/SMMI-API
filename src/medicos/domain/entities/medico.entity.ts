import { Especialidad } from 'src/especialidades/domain/entities/especialidade.entity';
import { Empleado } from 'src/shared/entities/empleado.entity';

export class Medico extends Empleado {
  matriculaMedico: string;
  cedula: string;
  contrasena: string;
  especialidades: Especialidad[]

  constructor(
    nombres: string,
    apellidos: string,
    direccion: string,
    telefono: string,
    curp: string,
    cedula: string,
    contrasena: string,
    genero: string,
    url_img: string,
    matricula?: string,
    id?: string,
    especialidades?: []
  ) {
    super(nombres, apellidos, direccion, telefono, curp, genero, url_img, id);
    this.cedula = cedula;
    this.contrasena = contrasena;
    this.especialidades = especialidades

    this.matriculaMedico = matricula ?? this.generatMatricula(cedula, curp);
  }

  private generatMatricula(cedula: string, curp: string): string {
    return 'M' + cedula.substring(0, 5) + curp.substring(0, 1);
  }

  asignarEspecialidades(especialidades: Especialidad[]) {


    this.especialidades = especialidades;
  }
}
