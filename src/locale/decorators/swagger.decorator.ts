import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Locale } from '../entities/locale.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

export const SwaggerFindOne = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Récupérer une langue' }),
    ApiOkResponse({ description: 'Langue récupéré', type: Locale }),
    ApiNotFoundResponse({ description: 'Langue introuvable' }),
  );
};

export const SwaggerFindAll = () => {
  return applyDecorators(ApiOperation({ summary: 'Récupérer les langues' }), ApiOkResponse({ description: 'Liste des langues', type: [Locale] }));
};

export const SwaggerCreate = () => {
  return applyDecorators(ApiOperation({ summary: 'Créer une langue' }), ApiOkResponse({ description: 'Langue créée', type: Locale }));
};

export const SwaggerUpdate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Mettre à jour une langue' }),
    ApiOkResponse({ description: 'Langue mise à jour', type: UpdateResult }),
    ApiNotFoundResponse({ description: 'Langue introuvable' }),
  );
};

export const SwaggerDelete = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Supprimer une langue' }),
    ApiOkResponse({ description: 'Langue supprimée', type: DeleteResult }),
    ApiNotFoundResponse({ description: 'Langue introuvable' }),
  );
};
