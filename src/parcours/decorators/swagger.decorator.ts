import { applyDecorators } from '@nestjs/common';
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Parcours } from '../entities/parcours.entity';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { InsertResult } from 'typeorm';

export const SwaggerFindOne = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Récupérer un parcours' }),
    ApiOkResponse({ description: 'Parcours récupéré', type: Parcours }),
    ApiNotFoundResponse({ description: 'Parcours introuvable' }),
  );
};

export const SwaggerFindAll = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Récupérer les parcours' }),
    ApiOkResponse({ description: 'Liste des parcours', type: PaginationDto<Parcours> }),
  );
};

export const SwaggerCreate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Créer un parcours' }),
    ApiOkResponse({ description: 'Parcours créé', type: InsertResult }),
    ApiForbiddenResponse({ description: 'Une erreur est survenue lors de la création du parcours' }),
  );
};

export const SwaggerUpdate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Mettre à jour un parcours' }),
    ApiOkResponse({ description: 'Parcours mis à jour', type: Parcours }),
  );
};

export const SwaggerDelete = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Supprimer un parcours' }),
    ApiNotFoundResponse({ description: 'Parcours introuvable' }),
    ApiOkResponse({ description: 'Parcours supprimé', type: Boolean }),
  );
};
