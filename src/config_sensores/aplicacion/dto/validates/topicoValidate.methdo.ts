import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { ConfigSensorDTO } from "../create-config_sensore.dto";

@ValidatorConstraint({ name: ' topicoUnico' })
export class topicoUnico implements ValidatorConstraintInterface {
    validate(value: ConfigSensorDTO[], validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        const topicos = new Set<string>();
        for (const config of value) {
            if (topicos.has(config.topico_sensor)) {
                return false; // Si encuentra un tipo de facturación repetido, devuelve falso
            }
            topicos.add(config.topico_sensor);
        }
        return true;
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return "El topic no debe ser el mismo "
    }

}