import { Empleado } from "src/shared/entities/empleado.entity";

export class Admin extends Empleado {
    matricula: string;
    contrasena: string;
    conocimiento_auxilios: boolean
    nivel_educacion: string

    constructor(
        nombres: string,
        apellidos: string,
        direccion: string,
        telefono: string,
        curp: string,
        genero: string,
        contrasena: string,
        url_img: string,
        nivel_educacion: string,
        conoci_auxi: boolean,
        id?: string,
        matricula?: string
    ) {

        super(nombres, apellidos, direccion, telefono, curp, genero, url_img, id)
        this.contrasena = contrasena
        this.conocimiento_auxilios = conoci_auxi
        this.nivel_educacion = nivel_educacion
        this.matricula = matricula ?? this.generatMatricula(curp)
    }
    private generatMatricula(curp: string): string {
        const numerosAleatorios: number[] = [];
        for (let index = 0; index < 5; index++) {
            const numeroAleatorio = Math.floor(Math.random() * (0 - 9)) + 9;
            numerosAleatorios.push(numeroAleatorio);
        }
        return 'A' + numerosAleatorios.join("") + curp.substring(0, 1);
    }
}