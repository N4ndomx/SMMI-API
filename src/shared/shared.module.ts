import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpleadoModel } from './models/empleado.model';
import { DbTransactionFactory } from './interfaces/TransactionFactory/transaction.factory';

@Module({
  imports: [TypeOrmModule.forFeature([EmpleadoModel])],
  providers: [DbTransactionFactory],
  exports: [DbTransactionFactory]
})
export class SharedModule { }
