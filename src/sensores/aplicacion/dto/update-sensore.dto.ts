import { PartialType } from '@nestjs/mapped-types';
import { CreateDataSensorDto } from './create-sensore.dto';

export class UpdateSensoreDto extends PartialType(CreateDataSensorDto) { }
