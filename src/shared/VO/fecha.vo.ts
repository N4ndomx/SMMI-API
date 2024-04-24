import { ValueObject } from "./vo.abstrac"

export class DateValue extends ValueObject<Date> {
    constructor(value: Date) {
        super(value)
    }

    get DayOfMonth(): number {
        return this.value.getDate()
    }

    get Month(): number {
        return this.value.getMonth() + 1
    }

    // Obtener el año
    get Year(): number {
        return this.value.getFullYear()
    }

    // Formatear la fecha como una cadena (por ejemplo, "dd/mm/yyyy")
    public format(): string {

        const opcionesFormato: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        const formatoFecha = new Intl.DateTimeFormat('es-ES', opcionesFormato);
        const fechaFormateada = formatoFecha.format(this.value);
        return fechaFormateada
    }


}