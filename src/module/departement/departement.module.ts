import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../../entities/departement.entity';
import { EmployeeService } from './service/departement.service';
import { EmployeeController } from './controller/departement.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})

export class EmployeeModule {} 
