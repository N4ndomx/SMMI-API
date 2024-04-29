import { Module } from '@nestjs/common';
import { AdminService } from './aplicacion/admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModel } from './infra/model/Admin.model';
import { SharedModule } from 'src/shared/shared.module';
import { IAdminRepositoryToken } from './domain/interfaces/admin-repository.interface';
import { AdminRepository } from './infra/admin.repository';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([AdminModel])],
  controllers: [AdminController],
  providers: [AdminService,
    AdminRepository,
    {
      provide: IAdminRepositoryToken,
      useExisting: AdminRepository
    }],
  exports: [AdminService]
})
export class AdminModule { }
