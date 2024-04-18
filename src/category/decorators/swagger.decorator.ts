import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';

export const SwaggerFindAll = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Récupérer les catégories' }),
    ApiOkResponse({ description: 'Liste des catégories', type: Array<Category> }),
  );
};
