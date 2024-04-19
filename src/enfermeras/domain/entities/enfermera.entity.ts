import { Empleado } from "src/shared/entities/empleado.entity";

export class Enfermera extends Empleado {
    matricula: string;
    cedula: string;
    contrasena: string;
    habilidades_tecnicas: string[]

    constructor(
        nombres: string,
        apellidos: string,
        direccion: string,
        telefono: string,
        curp: string,
        genero: string,
        cedula: string,
        contrasena: string,
        url_img: string,
        hab_tecnicas?: string[],
        id?: string,
        matricula?: string
    ) {

        super(nombres, apellidos, direccion, telefono, curp, genero, url_img, id)
        this.cedula = cedula;
        this.contrasena = contrasena
        this.habilidades_tecnicas = hab_tecnicas ?? [];
        this.matricula = matricula ?? this.generatMatricula(this.cedula, curp)
    }
    private generatMatricula(cedula: string, curp: string): string {
        return 'E' + cedula.substring(0, 5) + curp.substring(0, 1);
    }
}
