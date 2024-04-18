import { v4 as uuidv4 } from 'uuid';
export abstract class Empleado {
  id: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  telefono: string;
  curp: string;
  genero: string;
  url_img: string

  constructor(
    nombres: string,
    apellidos: string,
    direccion: string,
    telefono: string,
    curp: string,
    genero: string,
    url_img: string,
    id?: string,
  ) {
    this.id = id ?? uuidv4();
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.direccion = direccion;
    this.telefono = telefono;
    this.curp = curp;
    this.genero = genero;
    this.url_img = url_img
  }
}
