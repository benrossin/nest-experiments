import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocaleDto } from './dto/create-locale.dto';
import { UpdateLocaleDto } from './dto/update-locale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Locale } from './entities/locale.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class LocaleService {
  constructor(@InjectRepository(Locale) private localeRepository: Repository<Locale>) {}

  /**
   * Récupérer une langue
   */
  async findOne(id: string): Promise<Locale> {
    const locale = await this.localeRepository.findOneBy({ id });

    if (!locale) {
      throw new NotFoundException('Langue introuvable');
    }

    return locale;
  }

  /**
   * Récupérer toutes les langues
   */
  async findAll(): Promise<Locale[]> {
    return await this.localeRepository.find();
  }

  /**
   * Créer une langue
   */
  async create(createLocaleDto: CreateLocaleDto): Promise<Locale> {
    return await this.localeRepository.save(createLocaleDto);
  }

  /**
   * Mets à jour une langue
   */
  async update(id: string, updateLocaleDto: UpdateLocaleDto): Promise<UpdateResult> {
    try {
      return await this.localeRepository.update(id, updateLocaleDto);
    } catch (err) {
      throw new NotFoundException('Langue introuvable');
    }
  }

  /**
   * Supprimer une langue
   */
  async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.localeRepository.delete(id);
    } catch (err) {
      throw new NotFoundException('Langue introuvable');
    }
  }
}
