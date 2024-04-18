import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';

@Injectable()
export class UnitService {
  constructor(@InjectRepository(Unit) private readonly unitRepository: Repository<Unit>) {}

  /**
   * Récupérer toutes les unités
   */
  async findAll(): Promise<Unit[]> {
    return await this.unitRepository.find();
  }
}
