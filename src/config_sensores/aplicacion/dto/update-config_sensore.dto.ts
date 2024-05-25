import { PartialType } from '@nestjs/mapped-types';
import { CreateConfigSensoreDto } from './create-config_sensore.dto';

export class UpdateConfigSensoreDto extends PartialType(CreateConfigSensoreDto) {}
