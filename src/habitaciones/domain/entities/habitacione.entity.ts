import { fail } from "assert"
import { ConfigSensorModel } from "src/config_sensores/infra/persistencia/models/config_sensores.model"

export class Habitacion {

    id_habitacion?: number
    nombre_habitacion: string
    ocupado?: boolean
    config_sensores?: ConfigSensorModel[]

    public ocupar_habitacion() {
        this.ocupado = true
    }
    public desocupar_habitacion() {
        this.ocupado = false
    }
}
