import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departement } from 'src/entities/departement.entity';
import { DepartementDto } from '../dto/departement.dto';

@Injectable()
export class DepartementService {
  constructor(
    @InjectRepository(Departement)
    private readonly departementRepository: Repository<Departement>,
  ) {}

  async createDepartement(
    departementDto: DepartementDto,
  ): Promise<Departement> {
    try {
      if (!departementDto.parentId) {
        const ceo = await this.departementRepository.findOneBy({
          parentId: null,
        }); //
        if (ceo) {
          throw new ConflictException('root user already exist');
        }
      }

      const existingDepartement = await this.departementRepository.findOne({
        where: { name: departementDto.name },
      });
      if (existingDepartement) {
        throw new ConflictException(
          'Departement with the same attributes already exists',
        ); //HTTP respose 409
      }

      const newDepartement: Departement = new Departement();
      newDepartement.name = departementDto.name;
      newDepartement.description = departementDto.description;
      newDepartement.parentId = departementDto.parentId;

      if (!departementDto.name || !departementDto.description) {
        throw new BadRequestException('Name and description are required');
      }

      await this.departementRepository.save(newDepartement);
      return newDepartement;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllDepartement(): Promise<Departement[]> {
    try {
      return await this.departementRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOneDepartement(id: string): Promise<Departement> {
    try {
      return this.departementRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateDepartement(
    id: string,
    data: DepartementDto,
  ): Promise<Departement> {
    try {
      const existingDepartement = await this.departementRepository.findOneBy({
        id,
      });

      if (!existingDepartement) {
        throw new NotFoundException('Departement not found');
      }

      // Update the properties if provided in the request data
      if (data.name) {
        existingDepartement.name = data.name;
      }
      if (data.description) {
        existingDepartement.description = data.description;
      }

      // If parentId is provided, update the parent relationship
      if (data.parentId) {
        const newParent = await this.departementRepository.findOne({
          where: { id: data.parentId },
        });
        if (!newParent) {
          throw new NotFoundException('New parent position/role not found');
        }
        existingDepartement.parent = newParent;
      }

      return this.departementRepository.save(existingDepartement); // update
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async removeDepartement(id: string): Promise<void> {
    try {
      const departement = await this.departementRepository.findOneBy({ id });
      if (!departement) {
        throw new NotFoundException('Departement not found');
      }
      await this.departementRepository.delete(departement); //
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async getHierarchicalDepartements(): Promise<Departement> {
    try {
      const rootUser = await this.departementRepository.findOneBy({
        parentId: null,
      }); // all position, ! nullable
      if (!rootUser) {
        throw new NotFoundException('root user not found');
      }

      return this.buildHierarchy(rootUser);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async buildHierarchy(departement: Departement): Promise<Departement> {
    const children = await this.departementRepository.findBy({
      parentId: departement.id,
    });

    if (children.length > 0) {
      for (const child of children) {
        const hierarchy = await this.buildHierarchy(child); // recursive,
        if (!departement.children) {
          departement.children = [];
        }
        departement.children.push(hierarchy);
      }
    }

    return departement;
  }
}
// loops through each child and calls the `buildHierarchy` function again to construct the hierarchy for each child.

// compare with id instead of obj
