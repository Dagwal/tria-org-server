import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departement } from '../../entities/departement.entity';
import { DepartementService } from './service/departement.service';
import { DepartementController } from './controller/departement.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Departement])],
  controllers: [DepartementController],
  providers: [DepartementService],
})

export class DepartementModule {} 
