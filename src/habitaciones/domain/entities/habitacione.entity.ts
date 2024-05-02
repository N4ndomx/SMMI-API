import { fail } from "assert"

export class Habitacion {

    id_habitacion?: number
    nombre_habitacion: string
    ocupado?: boolean

    public ocupar_habitacion() {
        this.ocupado = true
    }
    public desocupar_habitacion() {
        this.ocupado = false
    }
}
