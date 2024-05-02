import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import {
  OpcionFiedOne,
  TIPO_BUSQUEDA,
} from 'src/shared/interfaces/opcion-fiedOne.dto';
import { regxCurp, regxMatricula } from '../helpers/regx.helper';

@Injectable()
export class TerminoValidate implements PipeTransform<string, OpcionFiedOne> {
  transform(value: string, metadata: ArgumentMetadata): OpcionFiedOne {


    const isCurp = value.match(regxCurp);
    const isMatricula = value.match(regxMatricula);

    if (!isMatricula && !isCurp) {
      throw new BadRequestException('El término proporcionado no es válido');
    }

    const objeto: OpcionFiedOne = {
      value: value,
      type: isCurp ? TIPO_BUSQUEDA.CURP : TIPO_BUSQUEDA.MATRICULA,
    };
    return objeto;
  }
}
