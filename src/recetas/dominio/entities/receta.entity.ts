import { Ingreso } from "src/ingresos/domain/entities/ingreso.entity"
import { IngresoModel } from "src/ingresos/infra/models/ingreso.model"
import { Medico } from "src/medicos/domain/entities/medico.entity"

export class Receta {
    id_receta: string
    medicamentos: string
    indicaciones_addic: string
    fecha_registro: Date
    medico: Medico
    ingreso: Ingreso


    constructor(
        medicamentos: string,
        indicaciones_addic: string,
        medico?: Medico,
        ingreso?: Ingreso

    ) {
        this.medicamentos = medicamentos
        this.indicaciones_addic = indicaciones_addic
        this.medico = medico ?? null
        this.ingreso = ingreso ?? null
        this.fecha_registro = new Date()
    }

}
