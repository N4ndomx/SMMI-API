import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpleadoModel } from './models/empleado.model';

@Module({
  imports: [TypeOrmModule.forFeature([EmpleadoModel])],
})
export class SharedModule {}
