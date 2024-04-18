export class Especialidad {
  id?: number;
  nombre: string;
  descripcion: string;
  constructor(nombre: string, descripcion: string, id?: number) {
    this.descripcion = descripcion;
    this.nombre = nombre;
    this.id = id ?? null;
  }
}
