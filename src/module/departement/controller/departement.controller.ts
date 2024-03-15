import { Controller,  Get,  Post,  Put,  Delete,  Param,  Body, ParseUUIDPipe} from "@nestjs/common";
import { DepartementService } from "../service/departement.service";
import { DepartementDto } from "../dto/departement.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Departements")
@Controller("departement")
export class DepartementController {
  constructor(private readonly employeeService: DepartementService) {}

  @Get()
  async findAll() {
    return this.employeeService.findAllDepartement();
  }

  @Get('hierarchical')
  async findHierarchicalDepartements() {
    return this.employeeService.getHierarchicalDepartements();
  }

  @Get(":id")
  async findOne(@Param("id", ParseUUIDPipe) id: string) {
    return await this.employeeService.findOneDepartement(id);
  }

  @Post()
  async create(@Body() employeeDto: DepartementDto) {
    return await this.employeeService.createDepartement(employeeDto);
  }

  @Put(":id")
  async update(@Param("id", ParseUUIDPipe) id: string, @Body() data: DepartementDto) {
    return await this.employeeService.updateDepartement(id, data);
  }

  @Delete('id')
  async delete(@Param('id') id: string): Promise<any>{
    return await this.employeeService.removeDepartement(id)
  }
}
 