export enum TIPO_BUSQUEDA {
  CURP = 'CURP',
  MATRICULA = 'MATRICULA',
}
export class OpcionFiedOne {
  type: TIPO_BUSQUEDA;

  value: string;
}
