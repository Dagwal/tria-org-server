import { Controller,  Get,  Post,  Put,  Delete,  Param,  Body, ParseUUIDPipe} from "@nestjs/common";
import { EmployeeService } from "../service/departement.service";
import { EmployeeDto } from "../dto/departement.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Departements")
@Controller("departement")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async findAll() {
    return this.employeeService.findAllEmployee();
  }

  @Get('hierarchical')
  async findHierarchicalEmployees() {
    return this.employeeService.getHierarchicalEmployees();
  }

  @Get(":id")
  async findOne(@Param("id", ParseUUIDPipe) id: string) {
    return await this.employeeService.findOneEmployee(id);
  }

  @Post()
  async create(@Body() employeeDto: EmployeeDto) {
    return await this.employeeService.createEmployee(employeeDto);
  }

  @Put(":id")
  async update(@Param("id", ParseUUIDPipe) id: string, @Body() data: EmployeeDto) {
    return await this.employeeService.updateEmployee(id, data);
  }

  @Delete('id')
  async delete(@Param('id') id: string): Promise<any>{
    return await this.employeeService.removeEmployee(id)
  }
}
 