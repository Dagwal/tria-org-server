import { Controller,  Get,  Post,  Put,  Delete,  Param,  Body, ParseUUIDPipe} from "@nestjs/common";
import { EmployeeService } from "../service/employee.service";
import { EmployeeDto } from "../dto/employee.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Employees")
@Controller("employee")
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
    await this.employeeService.createEmployee(employeeDto);
    return { message: "Employee created successfully" };
  }

  @Put(":id")
  async update(@Param("id", ParseUUIDPipe) id: string, @Body() data: EmployeeDto) {
    await this.employeeService.updateEmployee(id, data);
    return { message: "Employee updated successfully" };
  }

  @Delete('id')
  async delete(@Param('id') id: string): Promise<any>{
    await this.employeeService.removeEmployee(id)
    return "Employee removed successfuly";
  }
}
 