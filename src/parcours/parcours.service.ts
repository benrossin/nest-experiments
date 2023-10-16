import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateParcourDto } from './dto/create-parcour.dto';
import { UpdateParcourDto } from './dto/update-parcour.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Parcours } from './entities/parcours.entity';
import { DeleteResult, FindManyOptions, In, Not, Repository } from 'typeorm';
import { ParcoursTranslations } from './entities/parcours-translations.entity';
import { ParcoursTheme } from '../parcours-theme/entities/parcours-theme.entity';
import { User } from '../user/entities/user.entity';
import { PaginatorService } from '../common/services/paginator.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class ParcoursService {
  constructor(
    @InjectRepository(Parcours) private parcoursRepository: Repository<Parcours>,
    @InjectRepository(ParcoursTranslations) private parcoursTranslationsRepository: Repository<ParcoursTranslations>,
    @InjectRepository(ParcoursTheme) private parcoursThemeRepository: Repository<ParcoursTheme>,
    private paginatorService: PaginatorService,
  ) {}

  /**
   * Récupérer un parcours
   */
  async findOne(id: string): Promise<Parcours> {
    const parcours = await this.parcoursRepository.findOneBy({ id, isPublished: true });

    if (!parcours) {
      throw new NotFoundException('Parcours introuvable');
    }

    return parcours;
  }

  /**
   * Récupérer tous les parcours
   */
  async findAll(paginationQueryDto: PaginationQueryDto): Promise<PaginationDto<Parcours>> {
    const paramsQuery: PaginationQueryDto & FindManyOptions = { ...paginationQueryDto };
    return this.paginatorService.paginate(this.parcoursRepository, paramsQuery);
  }

  /**
   * Créer un parcours
   */
  async create(user: User, createParcourDto: CreateParcourDto): Promise<Parcours> {
    try {
      const { parcoursTranslations, themeId, ...data } = createParcourDto;
      const theme = await this.parcoursThemeRepository.findOneBy({ id: themeId });
      const parcours = await this.parcoursRepository.save({ ...data, user, theme });

      const parcoursTranslationsList = parcoursTranslations.map((pt) => {
        return this.parcoursTranslationsRepository.create({ parcoursId: parcours.id, ...pt });
      });
      await this.parcoursTranslationsRepository.insert(parcoursTranslationsList);
      parcours.parcoursTranslations = parcoursTranslationsList;

      return parcours;
    } catch (err) {
      throw new ForbiddenException('Une erreur est survenue lors de la création du parcours');
    }
  }

  /**
   * Mettre à jour un parcours
   */
  async update(id: string, updateParcourDto: UpdateParcourDto): Promise<Parcours> {
    try {
      const { parcoursTranslations, ...data } = updateParcourDto;
      await this.parcoursRepository.update({ id }, data);

      if (updateParcourDto?.parcoursTranslations?.length > 0) {
        const parcoursTranslationsList = parcoursTranslations.map((pt) => {
          return { parcoursId: id, ...pt };
        });
        await this.parcoursTranslationsRepository.upsert(parcoursTranslationsList, {
          conflictPaths: ['parcoursId', 'localeId'],
          skipUpdateIfNoValuesChanged: true,
        });

        const localeIds = parcoursTranslations.map((pt) => pt.localeId);
        await this.parcoursTranslationsRepository.delete({ parcoursId: id, localeId: Not(In(localeIds)) });
      }
      return await this.parcoursRepository.findOneBy({ id });
    } catch (err) {
      throw new ForbiddenException('Une erreur est survenue lors de la mise à jour du parcours');
    }
  }

  /**
   * Supprimer un parcours par son id
   */
  async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.parcoursRepository.delete({ id });
    } catch (err) {
      throw new NotFoundException('Parcours introuvable');
    }
  }
}
