import { Inject, Injectable } from '@nestjs/common';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { IRecetaRepository, IRecetaRepositoryToken } from '../dominio/interface/receta-repository.interface';
import { Receta } from '../dominio/entities/receta.entity';
import { MedicosService } from 'src/medicos/aplicacion/medicos.service';
import { TIPO_BUSQUEDA } from 'src/shared/interfaces/opcion-fiedOne.dto';
import { IngresosService } from 'src/ingresos/aplicacion/ingresos.service';

@Injectable()
export class RecetasService {
  constructor(
    @Inject(IRecetaRepositoryToken)
    private readonly recetaRepo: IRecetaRepository,
    private readonly medicoService: MedicosService,
    private readonly ingresoService: IngresosService,
  ) { }
  async create(createRecetaDto: CreateRecetaDto) {
    const { indicaciones_addic, matricula_medico, medicamentos, id_ingreso } = createRecetaDto
    const medicoSave = await this.medicoService.findOne({ type: TIPO_BUSQUEDA.MATRICULA, value: matricula_medico })
    console.log(medicoSave)
    const ingresofind = await this.ingresoService.findOne(id_ingreso)
    const receta = new Receta(
      medicamentos,
      indicaciones_addic,
      medicoSave,
      ingresofind
    )


    const { medico, ingreso, ...data } = await this.recetaRepo.save(receta)
    return {
      ...data,
      id_medico: medico.id
    }
  }

  findAll() {
    return `This action returns all recetas`;
  }

  async findOneByIngreso(id: string) {
    const ingreso = await this.ingresoService.findOne(id);
    const recetas: Receta[] = await this.recetaRepo.findByIngreso(ingreso.id_ingreso)

    return recetas
  }

  update(id: number, updateRecetaDto: UpdateRecetaDto) {
    return `This action updates a #${id} receta`;
  }

  remove(id: number) {
    return `This action removes a #${id} receta`;
  }
}
