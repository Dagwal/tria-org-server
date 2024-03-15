import { Controller,  Get,  Post,  Put,  Delete,  Param,  Body, ParseUUIDPipe} from "@nestjs/common";
import { DepartementService } from "../service/departement.service";
import { DepartementDto } from "../dto/departement.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Departements")
@Controller("departement")
export class DepartementController {
  constructor(private readonly departementService: DepartementService) {}

  @Get()
  async findAll() {
    return this.departementService.findAllDepartement();
  }

  @Get('hierarchical')
  async findHierarchicalDepartements() {
    return this.departementService.getHierarchicalDepartements();
  }

  @Get(":id")
  async findOne(@Param("id", ParseUUIDPipe) id: string) {
    return await this.departementService.findOneDepartement(id);
  }

  @Post()
  async create(@Body() departementDto: DepartementDto) {
    return await this.departementService.createDepartement(departementDto);
  }

  @Put(":id")
  async update(@Param("id", ParseUUIDPipe) id: string, @Body() data: DepartementDto) {
    return await this.departementService.updateDepartement(id, data);
  }

  @Delete('id')
  async delete(@Param('id') id: string): Promise<any>{
    return await this.departementService.removeDepartement(id)
  }
}
 