import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from 'src/entities/employee.entity';
import { EmployeeDto } from '../dto/employee.dto';

@Injectable()
export class EmployeeService {

  // @InjectRepository() is an extension of @Inject() that takes the currently passed entity/repository and uses some logic to create a new injection token.
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async createEmployee(employeeDto: EmployeeDto): Promise<Employee> {
    if (!employeeDto.parentId) {
      const ceo = await this.employeeRepository.findOneBy({parentId: null}) //
      if (ceo) {
        throw new ConflictException('root user already exist') // change the exception
      }
    }

    const existingEmployee = await this.employeeRepository.findOne({where: {name: employeeDto.name},});  
    if (existingEmployee) {
      throw new ConflictException('Employee with the same attributes already exists'); //HTTP respose 409
    } 

    const newEmployee: Employee = new Employee();
    newEmployee.name = employeeDto.name;
    newEmployee.description = employeeDto.description;
    newEmployee.parentId = employeeDto.parentId;

    if (!employeeDto.name || !employeeDto.description) {
      throw new BadRequestException ('Name and description are required');
    }
  
    await this.employeeRepository.save(newEmployee);
    return newEmployee;
  }

  async findAllEmployee(): Promise<Employee[]>{
    return this.employeeRepository.find();
  }
  
  async findOneEmployee(id: string): Promise<Employee>{
    return this.employeeRepository.findOne({ where: { id } });
  }  

  async updateEmployee(id: string, data: EmployeeDto): Promise<Employee> {
    const existingEmployee = await this.employeeRepository.findOneBy({id});
  
    if (!existingEmployee) {
      throw new NotFoundException('Position/role not found');
    }
  
    // Update the properties if provided in the request data
    if (data.name) {
      existingEmployee.name = data.name;
    }
    if (data.description) {
      existingEmployee.description = data.description;
    }
  
    // If parentId is provided, update the parent relationship
    if (data.parentId) {
      const newParent = await this.employeeRepository.findOne({ where: { id: data.parentId } });
      if (!newParent) {
        throw new NotFoundException('New parent position/role not found');
      }
      existingEmployee.parent = newParent;
    }
  
    return this.employeeRepository.save(existingEmployee); // update
  }
 
  async removeEmployee(id: string): Promise<void> {
    const employee = await this.employeeRepository.findOneBy({id});
  
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
  
    // Perform a hard delete by removing the employee from the database
    await this.employeeRepository.delete(employee); // 
  }

  async getHierarchicalEmployees(): Promise<Employee> {
      const rootUser = await this.employeeRepository.findOneBy({parentId:null}); // all position, ! nullable 
      if (!rootUser) {
        throw new NotFoundException('root user not found');
      }

      return this.buildHierarchy(rootUser);
    }

  private async buildHierarchy(employee: Employee): Promise<Employee> {
    const children = await this.employeeRepository.findBy({ parentId: employee.id });

    if (children.length > 0) {
      for (const child of children) {
        const hierarchy = await this.buildHierarchy(child); // recursive, 
        if (!employee.children) {
          employee.children = [];
        } 
        employee.children.push(hierarchy);
      }
    }

    return employee; 
  }
}
// loops through each child and calls the `buildHierarchy` function again to construct the hierarchy for each child.

// compare with id instead of obj
