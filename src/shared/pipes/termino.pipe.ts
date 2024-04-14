import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import {
  OpcionFiedOne,
  TIPO_BUSQUEDA,
} from 'src/auth/aplicacion/dto/opcion-fiedOne.dto';

@Injectable()
export class TerminoValidate implements PipeTransform<string, OpcionFiedOne> {
  transform(value: string, metadata: ArgumentMetadata): OpcionFiedOne {
    const reCurp =
      /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;

    const reMatricula = /^[MDE][1-9][0-9]{4}[A-Z]$/;

    const isCurp = value.match(reCurp);
    const isMatricula = value.match(reMatricula);

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
