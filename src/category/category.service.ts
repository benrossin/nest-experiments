import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {}

  /**
   * Récupérer toutes les catégories
   */
  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }
}
