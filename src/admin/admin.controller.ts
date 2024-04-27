import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './aplicacion/admin.service';
import { CreateAdminDto } from './aplicacion/dto/create-admin.dto';
import { UpdateAdminDto } from './aplicacion/dto/update-admin.dto';
import { TerminoValidate } from 'src/shared/pipes/termino.pipe';
import { OpcionFiedOne } from 'src/shared/interfaces/opcion-fiedOne.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':termino')
  findOne(@Param('termino', TerminoValidate) termino: OpcionFiedOne) {
    return this.adminService.findOne(termino);
  }
}
